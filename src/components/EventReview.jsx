import React, { useState, useEffect } from "react";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import eventFlyer from "../assets/eventFlyer.svg";
import { db } from "./firebase/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const EventReview = () => {
  const [eventDetails, setEventDetails] = useState(null);
  const [email, setEmail] = useState(""); // To track the email input for free ticket registration
  const [emailReg, setEmailReg] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false); // Track if the verification email is sent
  const [userVerified, setUserVerified] = useState(false); // Track if the user email is verified

  const navigate = useNavigate();

  useEffect(() => {
    const eventMarket = JSON.parse(localStorage.getItem("eventMarket") || "{}");
    const ticketInfo = JSON.parse(localStorage.getItem("ticketInfo") || "{}");
    const eventFormData = JSON.parse(
      localStorage.getItem("eventFormData") || "{}"
    );
    const details = { eventMarket, ticketInfo, eventFormData };
    setEventDetails(details);
    console.log("Event Details:", details);

    // Monitor user's authentication state and email verification status
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("object");
      if (user) {
        setUserVerified(user.emailVerified);
        // If the email is verified, update Firestore
        if (user.emailVerified) {
          updateUserVerificationStatus(user);
        }
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  // Function to update the user verification status in Firestore
  const updateUserVerificationStatus = async (user) => {
    const userDocRef = doc(db, "users", user.uid); // Reference to the user's document using their UID

    // Update the user's verification status in Firestore
    try {
      await updateDoc(userDocRef, {
        verificationStatus: user.emailVerified, // Update verificationStatus
      });
      console.log("User verification status updated in Firestore.");
      // window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  // Handle event upload after email verification
  const handleUpload = async () => {
    const email = localStorage.getItem("emailForUploading");
    console.log(email);
    if (eventDetails && userVerified && email) {
      try {
        // Upload event details to Firestore, including email
        await addDoc(collection(db, "events"), {
          ...eventDetails,
          status: "pending",
          email, // Make sure email is added here
          uploadedAt: new Date(), // Add a timestamp
        });
        // setUserVerified(false); // Reset the verification status
        alert("Event details successfully uploaded to Firestore.");
        console.log("Event details successfully uploaded to Firestore.");
        navigate("/home"); // Redirect to the home page
      } catch (error) {
        console.error("Error uploading event details:", error);
      }
    } else {
      setUserVerified(false); // Reset the verification status
      console.warn(
        "No event details available to upload, email not verified, or email is missing."
      );
    }
  };

  // Send verification email with a custom link
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("emailForUploading", email); // Save email for reference
    const auth = getAuth();

    try {
      // Check if the email already exists in Firestore
      const userQuerySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", email))
      );

      // If user exists, check verification status
      if (!userQuerySnapshot.empty) {
        const existingUser = userQuerySnapshot.docs[0].data();
        if (existingUser.verificationStatus) {
          console.log("User email already verified!");
          alert("Your email is already verified.");
          setEmailReg(false);
          setUserVerified(true);
          // window.location.reload(); // Reload the page to reflect the changes

          return; // Don't send another verification email if already verified
        } else {
          window.location.reload(); // Reload the page to reflect the changes
          console.log("User exists but email is not verified.");
        }
      }

      // Proceed with sign-up and send verification email if the email is not in use or not verified
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        "randompassword123" // Generate a random password (you can change this)
      );
      const newUser = userCredential.user;
      createUserProfile(newUser); // Create user profile in Firestore

      // Send email verification with a custom link
      await sendEmailVerification(newUser);
      console.log("Verification email sent!");
      setVerificationSent(true); // Set flag to show that verification email was sent
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const createUserProfile = (user) => {
    const userDocRef = doc(db, "users", user.uid); // Reference to the user's document using their UID

    // Define the user profile data
    const userProfileData = {
      email: user.email,
      verificationStatus: user.emailVerified,
      // Add other user-specific data as needed
    };
    setDoc(userDocRef, userProfileData)
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(
          "Error creating user profile:",
          error,
          "collection creation error"
        );
      });
  };

  return (
    <div className="container-md mt-[48px] p-0 min-h-screen">
      <span className="text-[32px] text-white mb-6">
        Event <span className="text-[#FFDE00]">Review</span>
      </span>
      {emailReg && (
        <div className="fixed top-0 left-0 w-full px-2 h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white bg-[#180707] border !border-[#FFDE00] py-[44px] p-4 rounded-lg m-2">
            <div className="flex justify-between items-center mb-4">
              <FontAwesomeIcon icon={faX} onClick={() => setEmailReg(false)} />
              <span> Ticket Registration</span>
            </div>
            <form onSubmit={handleEmailSubmit}>
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="email" className="text-[#FFFFFF80]">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg bg-transparent border !border-[#FFFFFF80]"
                />
              </div>
              <div className="text-[12px] my-4 !text-[#FFFFFF80]">
                A confirmation link will be sent to your email to complete your
                registration. Please check your inbox or spam folder to complete
                the process.
              </div>
              <button type="submit" className="btn btn-light w-full mt-3">
                Send Link
              </button>
              {verificationSent && (
                <div className="mt-4 text-[#FFDE00]">
                  Verification email sent! Please check your inbox.
                </div>
              )}
            </form>
          </div>
        </div>
      )}
      {eventDetails && (
        <section className="flex flex-col md:flex-row gap-4 p-4 items-start justify-center">
          <span className="w-[402px] xs:w-full">
            <img
              src={eventDetails.eventMarket.imagePreview || eventFlyer}
              alt={`${eventDetails.eventFormData.name} Flyer`}
              className="w-full rounded-xl border border-white"
            />
          </span>
          <div className="flex flex-col gap-3 text-white event-details xsm:w-full">
            <h3>{eventDetails.eventFormData.name}</h3>
            <p>{eventDetails.eventFormData.description}</p>
            <h3 className="text-xl">Details</h3>
            <ul>
              <li>Venue: {eventDetails.eventFormData.venue}</li>
              <li>Date: {eventDetails.eventFormData.date}</li>
              <li>Start Time: {eventDetails.eventFormData.start_time}</li>
              <li>End Time: {eventDetails.eventFormData.end_time}</li>
              <li>Dress Code: {eventDetails.eventFormData.dress_code}</li>
            </ul>
            <h3>Tickets</h3>
            <ul>
              <li>Tickets: {eventDetails.ticketInfo.ticketType}</li>
              {eventDetails.ticketInfo.categories.map((category, index) => (
                <li key={index}>
                  {category.name}: {category.price}
                </li>
              ))}
            </ul>
            <section className="w-full flex xsm:flex-col gap-4">
              {!userVerified && (
                <button
                  className="btn btn-light w-full"
                  onClick={() => setEmailReg(true)}
                >
                  Verify Email
                </button>
              )}
              {userVerified && (
                <button className="btn btn-light w-full" onClick={handleUpload}>
                  Upload Event to Firestore
                </button>
              )}
            </section>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventReview;
