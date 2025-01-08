import { updateDoc } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../components/firebase/config";

export const fetchEvents = async () => {
  try {
    const eventsRef = collection(db, "events");
    const eventsQuery = query(eventsRef, orderBy("uploadedAt", "desc")); // Order events by uploadedAt
    const querySnapshot = await getDocs(eventsQuery);

    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(events);
    return { success: true, events };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: error.message };
  }
};

fetchEvents();

// Function to fetch an event by its ID
export const fetchEventById = async (eventId) => {
  try {
    // Get a reference to the document
    const eventDocRef = doc(db, "events", eventId);

    // Fetch the document
    const eventDoc = await getDoc(eventDocRef);

    // Check if the event exists
    if (eventDoc.exists()) {
      return { success: true, event: eventDoc.data() };
    } else {
      return { success: false, error: "Event not found" };
    }
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return { success: false, error: error.message };
  }
};

// Existing functions...

// Function to update ticket quantities
export const updateTicketQuantity = async (eventId, purchaseDetails) => {
  try {
    // Reference the specific event document
    const eventDocRef = doc(db, "events", eventId);

    // Fetch the current event data
    const eventDoc = await getDoc(eventDocRef);
    if (!eventDoc.exists()) {
      return { success: false, error: "Event not found" };
    }

    const eventData = eventDoc.data();

    // Update the ticket quantities
    const updatedCategories = eventData.ticketInfo.categories.map(
      (category) => {
        const purchase = purchaseDetails.find(
          (p) => p.categoryName === category.name
        );
        if (purchase) {
          const newQuantity = category.quantity - purchase.count;
          if (newQuantity < 0) {
            throw new Error(
              `Not enough tickets available for ${category.name}`
            );
          }
          return { ...category, quantity: newQuantity };
        }
        return category;
      }
    );

    // Update the Firestore document
    await updateDoc(eventDocRef, {
      "ticketInfo.categories": updatedCategories,
    });

    return { success: true };
  } catch (error) {
    console.error("Error updating ticket quantities:", error);
    return { success: false, error: error.message };
  }
};

export const fetchTicketByReference = async (transactionRef) => {
  try {
    const ticketsRef = collection(db, "tickets");
    const ticketsQuery = query(
      ticketsRef,
      where("transactionRef", "==", transactionRef)
    );
    const querySnapshot = await getDocs(ticketsQuery);

    if (querySnapshot.empty) {
      return {
        success: false,
        error: "No tickets found for the given reference",
      };
    }

    const tickets = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, tickets };
  } catch (error) {
    console.error("Error fetching ticket by reference:", error);
    return { success: false, error: error.message };
  }
};

const createTickets = async (eventId, purchaseDetails, userEmail) => {
  try {
    const ticketsRef = collection(db, "tickets");

    for (const { categoryName, count } of purchaseDetails) {
      for (let i = 0; i < count; i++) {
        await addDoc(ticketsRef, {
          eventId,
          categoryName,
          userEmail,
          createdAt: new Date(),
          isUsed: false, // Field to track if the ticket has been used
        });
      }
    }

    alert("Tickets successfully created!");
  } catch (error) {
    console.error("Error creating tickets:", error);
    throw new Error("Failed to create tickets. Please try again.");
  }
};

export default createTickets;
