import React from "react";
import logOutIcon from "../../assets/logoutIcon.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Logout = () => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // Optionally navigate to the login page or show a success message
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
    localStorage.removeItem("userId");
  };

  return (
    <>
      <img
        src={logOutIcon}
        alt="logout"
        onClick={handleSignOut}
        className="w-[20px]"
      />
    </>
  );
};

export default Logout;
