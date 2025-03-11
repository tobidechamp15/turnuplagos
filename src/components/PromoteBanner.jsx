import React, { useState } from "react";
import uploadImg from "../assets/uploadImg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase/config";
import { useEffect } from "react";
import { faInfo } from "@fortawesome/free-solid-svg-icons/faInfo";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "./SuccessMessage";

const PromoteBanner = () => {
  const [imagePreview, setImagePreview] = useState(uploadImg);
  const [socialMediaLinks, setSocialMediaLinks] = useState({ link: "" });
  const [successMessage, setSuccessMessage] = useState({ link: "" });
  const [email, setEmail] = useState(""); // To track the email input for free ticket registration
  const [name, setName] = useState(""); // To track the email input for free ticket registration
  const [emailReg, setEmailReg] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false); // Track if the verification email is sent
  const [userVerified, setUserVerified] = useState(true); // Track if the user email is verified

  useEffect(() => {
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
  }, [email]);
  const navigate = useNavigate();
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

  // Handle image upload and resize to 1440 x 239
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const targetWidth = 1440;
          const targetHeight = 239;

          // Set canvas dimensions
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Draw resized image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert canvas to a base64 image
          const resizedImage = canvas.toDataURL("image/jpeg");
          setImagePreview(resizedImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle social media input change
  const handleSocialMediaChange = (e) => {
    setSocialMediaLinks({
      ...socialMediaLinks,
      [e.target.name]: e.target.value,
    });
  };

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
          const localBanner = localStorage.getItem("bannerForm");
          console.log(localBanner);
          return; // Don't send another verification email if already verified
        } else {
          console.log("user unverified");
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
      if (email.endsWith("@turnup.com")) {
        await createAdminProfile(newUser);
        console.log("Admin profile created!");
      }
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
  const createAdminProfile = (user) => {
    const adminDocRef = doc(db, "admins", user.uid);
    const userProfileData = {
      email: user.email,
      verificationStatus: user.emailVerified,
      // Add other user-specific data as needed
    };
    setDoc(adminDocRef, userProfileData)
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
  const handleUpload = async () => {
    const formData = {
      name,
      socialMediaLinks,
      imagePreview,
      status: "pending",
    };
    localStorage.setItem("bannerForm", JSON.stringify(formData));

    const email = localStorage.getItem("emailForUploading");
    console.log(email);
    if (formData && userVerified && email) {
      try {
        // Upload event details to Firestore, including email
        await addDoc(collection(db, "banner"), {
          ...formData,
          email, // Make sure email is added here
          uploadedAt: new Date(), // Add a timestamp
        });
        setUserVerified(false); // Reset the verification status
        setSuccessMessage("Banner details successfully uploaded.");
        // alert("Banner details successfully uploaded to Firestore.");
        console.log("Event details successfully uploaded to Firestore.");
        navigate("/"); // Redirect to the home page
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
  return (
    <div className="text-white flex flex-col w-full items-center mt-[48px] min-h-screen">
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(false)}
          duration={3000} // Optional, defaults to 3000ms
        />
      )}
      {emailReg && (
        <div className="fixed top-0 left-0 w-full px-2 h-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white bg-[#000] border !border-[#FFDE00] py-[44px] p-4 rounded-lg m-2">
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
      <div className="flex flex-col items-center gap-2">
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          onClick={() => document.querySelector('input[type="file"]').click()}
          className={`${
            imagePreview !== uploadImg
              ? "w-full max-w-[1440px]"
              : "w-[300px] xsm:w-full"
          } h-auto object-cover cursor-pointer`}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <span className="text-[12px] text-warning">
          <FontAwesomeIcon icon={faInfo} /> Click current Image to change image
        </span>
      </div>
      <div className="flex flex-col gap-2 xsm:w-full px-2">
        <div className="mt-4 md:!w-[70vw] xsm:w-full">
          <label htmlFor="link" className="block mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            className="w-full p-2 rounded-lg bg-transparent border text-white"
          />
        </div>
        <div className="mt-4 md:!w-[70vw] xsm:w-full">
          <label htmlFor="link" className="block mb-2">
            Business Link (optional)
          </label>
          <input
            type="text"
            id="link"
            name="link"
            value={socialMediaLinks.link}
            onChange={handleSocialMediaChange}
            placeholder="Enter your business link"
            className="w-full p-2 rounded-lg bg-transparent border text-white"
          />
        </div>
      </div>
      <section className="w-full flex xsm:flex-col gap-4 items-center my-3 justify-center">
        {!userVerified && (
          <button
            className="btn btn-light w-fit"
            onClick={() => setEmailReg(true)}
          >
            Verify Email
          </button>
        )}
        {userVerified && (
          <button className="btn btn-light w-fit" onClick={handleUpload}>
            Upload Event to Admin
          </button>
        )}
      </section>
    </div>
  );
};

export default PromoteBanner;
