import { setDoc, writeBatch } from "firebase/firestore";
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../components/firebase/config";

/** Fetch Uploaded Banners */
export const fetchUploadedBanners = async () => {
  try {
    const uploadedBannersRef = collection(db, "uploadedBanners");
    const bannerQuery = query(
      uploadedBannersRef,
      orderBy("uploadedAt", "desc")
    );
    const querySnapshot = await getDocs(bannerQuery);

    const banners = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Uploaded Banners:", banners);
    return { success: true, banners };
  } catch (error) {
    console.error("Error fetching uploaded banners:", error);
    return { success: false, error: error.message };
  }
};

/** Fetch Uploaded Events */
export const fetchUploadedEvents = async () => {
  try {
    const uploadedEventsRef = collection(db, "uploadedEvents");
    const eventQuery = query(uploadedEventsRef, orderBy("uploadedAt", "desc"));
    const querySnapshot = await getDocs(eventQuery);

    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Uploaded Events:", events);
    return { success: true, events };
  } catch (error) {
    console.error("Error fetching uploaded events:", error);
    return { success: false, error: error.message };
  }
};

/** Delete Uploaded Banner */
export const deleteUploadedBanner = async (bannerId) => {
  try {
    const bannerDocRef = doc(db, "uploadedBanners", bannerId);
    await deleteDoc(bannerDocRef);

    alert("Uploaded Banner Successfully deleted");
    window.location.reload();
    return { success: true };
  } catch (error) {
    console.error("Error deleting uploaded banner:", error);
    return { success: false, error: error.message };
  }
};

/** Add Uploaded Banner */
export const uploadNewBanner = async (bannerData) => {
  try {
    if (!bannerData.id) {
      throw new Error("Banner ID is required to upload the banner.");
    }

    const bannerDocRef = doc(db, "uploadedBanners", bannerData.id);
    const bannerRef = doc(db, "banner", bannerData.id);

    await setDoc(bannerDocRef, {
      ...bannerData,
      status: "uploaded",
      uploadedAt: new Date(),
    });
    await updateDoc(bannerRef, {
      status: "uploaded",
    });

    alert("Banner uploaded successfully!");
    let loading = true;
    window.location.reload();
    return { success: true, loading };
  } catch (error) {
    console.error("Error uploading banner:", error);
    return { success: false, error: error.message };
  }
};

/** Delete Uploaded Event */
export const deleteUploadedEvent = async (eventId) => {
  try {
    const eventDocRef = doc(db, "uploadedEvents", eventId);
    await deleteDoc(eventDocRef);

    alert("Uploaded Event Successfully deleted");
    window.location.reload();
    return { success: true };
  } catch (error) {
    console.error("Error deleting uploaded event:", error);
    return { success: false, error: error.message };
  }
};

/** Add Uploaded Event */
export const uploadNewEvent = async (eventData) => {
  try {
    const uploadedEventsRef = doc(db, "events", eventData.id);
    await updateDoc(uploadedEventsRef, {
      ...eventData,
      status: "uploaded",
      uploadedAt: new Date(),
    });

    alert("Event uploaded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error uploading event:", error);
    return { success: false, error: error.message };
  }
};

/** Replace Uploaded Banner */

export const replaceUploadedBanner = async (selectedBanners, newBannerData) => {
  try {
    const batch = writeBatch(db);

    selectedBanners.forEach((bannerId) => {
      const bannerDocRef = doc(db, "banner", bannerId);
      batch.update(bannerDocRef, {
        ...newBannerData,
        updatedAt: new Date(),
      });
    });

    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error replacing uploaded banners:", error);
    return { success: false, error: error.message };
  }
};

/** Replace Uploaded Event */
export const replaceUploadedEvent = async (eventId, newEventData) => {
  try {
    const eventDocRef = doc(db, "uploadedEvents", eventId);
    await updateDoc(eventDocRef, {
      ...newEventData,
      updatedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error replacing uploaded event:", error);
    return { success: false, error: error.message };
  }
};
