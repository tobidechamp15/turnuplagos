import { getAuth, updateProfile } from "firebase/auth";
import { addDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/config";

export const fetchAdminByEmail = async (adminEmail) => {
  try {
    // Define the collection reference
    const adminCollectionRef = collection(db, "admins");

    // Create a query to search by email field
    const q = query(adminCollectionRef, where("email", "==", adminEmail));

    // Fetch matching documents
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const adminData = querySnapshot.docs[0].data();
      return { success: true, admin: adminData };
    } else {
      return { success: false, error: "Admin not found" };
    }
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    return { success: false, error: error.message };
  }
};

export const fetchAdmins = async () => {
  try {
    const eventsRef = collection(db, "admins");
    const data = await getDocs(eventsRef);
    const admins = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    console.log(admins);
    return { success: true, admins };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { success: false, error: error.message };
  }
};
export const editProfile = async (userData) => {
  console.log(userData);
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return { success: false, error: "No user is logged in" };
  }

  try {
    // Prepare profile data updates
    const updatedProfileData = {};

    if (userData.photoURL) updatedProfileData.photoURL = userData.photoURL;

    // Update Firebase Auth profile if data provided
    if (Object.keys(updatedProfileData).length > 0) {
      await updateProfile(user, updatedProfileData);
    }
    const updatedData = {
      ...(userData.firstName !== undefined && {
        firstName: userData.firstName,
      }),
      ...(userData.lastName !== undefined && { lastName: userData.lastName }),
      ...(userData.photoURL !== undefined && { photoURL: userData.photoURL }),
      ...(user.email !== undefined && { email: user.email }),
    };
    // Update Firestore document for additional user data
    const userDocRef = doc(db, "admins", user.uid);
    await setDoc(userDocRef, updatedData, { merge: true });
    await addDoc(collection(db, "notifications"), {
      action: "User Profile Edited",
      timestamp: serverTimestamp(),
      userId: user ? user.uid : "unknown",
      status: "success",
    });
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: "Failed to update profile. Please try again.",
    };
  }
};
