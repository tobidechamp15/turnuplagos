import { deleteDoc, updateDoc } from "firebase/firestore";
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
export const fetchBanner = async () => {
  try {
    const bannerRef = collection(db, "banner");
    const bannerQuery = query(bannerRef, orderBy("uploadedAt", "desc")); // Order events by uploadedAt
    const querySnapshot = await getDocs(bannerQuery);

    const banner = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(banner, "banner");
    return { success: true, banner };
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

export const updateEvent = async (eventId, updatedData) => {
  try {
    if (!eventId) {
      throw new Error("Event ID is missing");
    }

    // Reference to the specific event document
    const eventDocRef = doc(db, "events", eventId);

    // Prepare the data to update under eventFormData
    const dataToUpdate = {
      eventFormData: {
        ...updatedData, // Spread the updated data into eventFormData
      },
    };

    // Log the eventId and dataToUpdate for debugging
    console.log("Updating event with ID:", eventId);
    console.log("Data to update:", dataToUpdate);

    // Update the Firestore document with the new eventFormData
    await updateDoc(eventDocRef, dataToUpdate);

    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: error.message };
  }
};

export const updateTicket = async (updatedTicket, id) => {
  try {
    const ticketDocRef = doc(db, "events", id); // Assuming ticket has an ID field

    const dataToUpdate = {
      ticketInfo: {
        ...updatedTicket, // Spread the updated data into eventFormData
      },
    };
    await updateDoc(ticketDocRef, dataToUpdate);

    return { success: true, dataToUpdate };
  } catch (error) {
    console.error("Error updating ticket:", error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    // Reference to the specific event document
    const eventDocRef = doc(db, "events", eventId);

    // Delete the document
    await deleteDoc(eventDocRef);

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};
export const deleteBanner = async (bannerId) => {
  try {
    // Reference to the specific event document
    const bannerDocRef = doc(db, "banner", bannerId);
    const upBannerDocRef = doc(db, "updateBanner", bannerId);

    // Delete the document
    await deleteDoc(bannerDocRef, upBannerDocRef);
    alert("Banner Successfully deleted");
    window.location.reload();
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};

export const replaceBanner = async (bannerId, newBannerData) => {
  try {
    const bannerDocRef = doc(db, "banner", bannerId);

    // Update the banner document with new data
    await updateDoc(bannerDocRef, newBannerData);

    return { success: true };
  } catch (error) {
    console.error("Error replacing banner:", error);
    return { success: false, error: error.message };
  }
};
