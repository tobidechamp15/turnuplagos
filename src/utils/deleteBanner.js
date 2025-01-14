import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../components/firebase/config";

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
