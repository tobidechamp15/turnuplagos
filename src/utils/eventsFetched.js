import {
  deleteDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
import { getAuth } from "firebase/auth";

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
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user
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

    await addDoc(collection(db, "notifications"), {
      action: "Event Information Edited",
      eventId,
      timestamp: serverTimestamp(),
      userId: user ? user.uid : "unknown",
      status: "success",
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating event:", error);
    return { success: false, error: error.message };
  }
};

export const updateTicket = async (updatedTicket, id) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user
  try {
    const ticketDocRef = doc(db, "events", id); // Assuming ticket has an ID field

    const dataToUpdate = {
      ticketInfo: {
        ...updatedTicket, // Spread the updated data into eventFormData
      },
    };
    await updateDoc(ticketDocRef, dataToUpdate);

    await addDoc(collection(db, "notifications"), {
      action: "Ticket Information Edited",
      id,
      timestamp: serverTimestamp(),
      userId: user ? user.uid : "unknown",
      status: "success",
    });

    return { success: true, dataToUpdate };
  } catch (error) {
    console.error("Error updating ticket:", error);
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (event) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user

  try {
    // Reference to the specific event document
    const eventDocRef = doc(db, "events", event.id);

    // Delete the document
    await deleteDoc(eventDocRef);

    await setDoc(eventDocRef, {
      ...event,
      status: "deleted",
      uploadedAt: new Date(),
    });

    await addDoc(collection(db, "notifications"), {
      action: "Event Rejected",
      eventId: event.id,
      timestamp: serverTimestamp(),
      userId: user ? user.uid : "unknown",
      status: "success",
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};
export const deleteBanner = async (bannerData) => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user

  try {
    if (!bannerData.id) {
      throw new Error("Banner ID is required to upload the banner.");
    }
    // Reference to the specific event document
    const bannerDocRef = doc(db, "banner", bannerData.id);

    // Delete the document
    await setDoc(bannerDocRef, {
      ...bannerData,
      status: "deleted",
      uploadedAt: new Date(),
    });

    alert("Banner Successfully deleted");

    // Create a notification record for the event fetch
    await addDoc(collection(db, "notifications"), {
      action: "Banner Deleted",
      bannerId: bannerData.id,
      timestamp: serverTimestamp(),
      userId: user ? user.uid : "unknown",
      status: "success",
    });

    window.location.reload();
    return { success: true };
  } catch (error) {
    console.error("Error deleting event:", error);
    return { success: false, error: error.message };
  }
};

export const replaceBanner = async (bannerIds) => {
  try {
    if (bannerIds.length % 2 !== 0) {
      throw new Error(
        "The number of banner IDs should be even to swap them in pairs."
      );
    }

    for (let i = 0; i < bannerIds.length; i += 2) {
      const firstBannerId = bannerIds[i];
      const secondBannerId = bannerIds[i + 1];

      const firstBannerDocRef = doc(db, "banner", firstBannerId);
      const secondBannerDocRef = doc(db, "banner", secondBannerId);

      // Get the data of both banners
      const firstBannerSnapshot = await getDoc(firstBannerDocRef);
      const secondBannerSnapshot = await getDoc(secondBannerDocRef);

      if (!firstBannerSnapshot.exists() || !secondBannerSnapshot.exists()) {
        throw new Error("One or more banners do not exist.");
      }

      const firstBannerData = firstBannerSnapshot.data();
      const secondBannerData = secondBannerSnapshot.data();

      // Swap the banner data
      await updateDoc(firstBannerDocRef, secondBannerData);
      await updateDoc(secondBannerDocRef, firstBannerData);
    }

    return { success: true };
  } catch (error) {
    console.error("Error replacing banners:", error);
    return { success: false, error: error.message };
  }
};
