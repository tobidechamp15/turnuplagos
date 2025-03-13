import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../components/firebase/config";
import { getAuth } from "firebase/auth";

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
