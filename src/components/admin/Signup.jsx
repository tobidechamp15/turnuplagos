import React, { useEffect, useState } from "react";
import logo from "../../assets/blackLogo.svg";
import manAvatar from "../../assets/manAvatar.svg"; // Assuming it's a locally stored asset
import womanAvatar from "../../assets/womanAvatar.svg"; // Assuming it's a locally stored asset
import backGraphic from "../../assets/sideGraphic.svg";
import "../../App.css";
import AdminLoader from "./AdminLoader";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { app, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { fetchAdmins } from "../../utils/fetchAdmin";
import AdminPresentMessage from "./AdminPresentMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [avatarUrls, setAvatarUrls] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Restrict to specific domain
      if (!email.endsWith("@turnuplagos.com")) {
        setError("Provided email is not a required admin email");
        setIsLoading(false);
        return;
      }

      // Check if the email belongs to an existing admin
      const adminCheck = await fetchAdmins();
      if (adminCheck.success) {
        const adminLogged = adminCheck.admins.find(
          (admin) => admin.email === email
        );
        if (adminLogged) {
          setIsAdmin(true);
          setError("Admin account already exists. Please sign in.");
          setIsLoading(false);
          return;
        }
      }

      let auth = getAuth(app);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(response.user);
      createUserProfile(response.user, firstName, lastName, photoURL);

      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      setError(
        "This email is already in use. Please sign in or choose a different email to continue."
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserProfile = async (user, firstName, lastName, photoURL) => {
    const userDocRef = doc(db, "admins", user.uid);
    const userProfileData = {
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      photoURL: photoURL,
      verificationStatus: user.emailVerified,
    };
    try {
      await setDoc(userDocRef, userProfileData);
    } catch (error) {
      console.error("Error Creating user Profile", error);
    }
  };

  useEffect(() => {
    // Convert avatar images to URL when component is mounted
    const loadAvatars = async () => {
      try {
        const urls = await convertAvatarToUrl([manAvatar, womanAvatar]);
        setAvatarUrls(urls);
      } catch (error) {
        console.error("Error converting images:", error);
      }
    };
    loadAvatars();
  }, []);

  const convertAvatarToUrl = (imageArray) => {
    return Promise.all(
      imageArray.map((image) => {
        // Directly return the image source if it's already a URL or base64 string
        return new Promise((resolve) => {
          resolve(image); // image is already a valid URL or data URL
        });
      })
    );
  };

  if (isLoading) return <AdminLoader />;
  if (isAdmin) return <AdminPresentMessage email={email} />;
  return (
    <div className="h-screen flex items-center justify-center w-full md:flex-row flex-col">
      <div className="flex flex-col gap-3 justify-center w-full  h-full p-8 md:w-1/2">
        <img src={logo} alt="Company Logo" className="w-32 mb-3" />
        <span className="text-head text-lg font-semibold text-start">
          Create Your Admin Account{" "}
        </span>
        <span className="text-mot text-sm text-start">
          Sign up to manage events, banners, and more on TurnUp Lagos.{" "}
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="cus-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              id="firstName"
              className="cus-input p-2 border-none rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="cus-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              id="lastName"
              className="cus-input p-2 border-none rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="cus-label">
              Email Address
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              className="cus-input p-2 border-none rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="cus-label ">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              autoComplete="current-password"
              id="password"
              className="cus-input p-2 border-none rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-sm text-[#787878B2]">
              Password must be 8+ characters with letters and numbers.
            </span>
          </div>{" "}
          {selectedProfile && (
            <div className="flex h-screen bg-[#000000B2] fixed top-0 left-0 items-center justify-center w-full">
              <div className="flex flex-col bg-white items-center justify-center gap-4 py-3 px-4 rounded-lg">
                <section className="flex justify-between w-full items-center">
                  <FontAwesomeIcon
                    icon={faX}
                    onClick={() => setSelectedProfile(false)}
                  />
                  <span className="text-xl font-semibold">Avatars</span>
                  <span></span>
                </section>
                <span className="text-gray-600">
                  Select an Avatar that best describes you
                </span>
                <section className="flex gap-6">
                  {avatarUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Avatar ${index + 1}`}
                      className={`w-[80px] h-[80px] rounded-full cursor-pointer ${
                        photoURL === url ? "border-4 border-blue-500" : ""
                      }`}
                      onClick={() => setPhotoURL(url)}
                    />
                  ))}
                </section>
                <button type="submit" className="btn btn-primary">
                  Proceed
                </button>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <section
            onClick={() => setSelectedProfile(true)}
            className="bg-blue-500 btn text-white p-2 rounded hover:bg-blue-600 my-2"
          >
            Create Account
          </section>
        </form>
        <div>
          <span>Do you have an account </span>
          <Link to="/login" className="text-primary">
            Click here to sign in.
          </Link>
        </div>
      </div>
      <div className="h-full w-full md:w-1/2 xsm:hidden">
        <img
          src={backGraphic}
          alt="Background Graphic"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
