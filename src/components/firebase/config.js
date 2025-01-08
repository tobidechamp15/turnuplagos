// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6SgOsEdRCqw94yoO442y7zIE_-9poJVA",
  authDomain: "turnup-lagos.firebaseapp.com",
  projectId: "turnup-lagos",
  storageBucket: "turnup-lagos.firebasestorage.app",
  messagingSenderId: "750376203470",
  appId: "1:750376203470:web:7dbd15a58418055f1b4c9f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const userId = localStorage.getItem("userId");

export { analytics };
export { db };
export { userId };
