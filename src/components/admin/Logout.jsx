import React, { useState } from "react";
import logOutIcon from "../../assets/logoutIcon.svg";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import AdminLoader from "./AdminLoader";

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLoading(true);
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
  if (isLoading) return <AdminLoader />;

  return (
    <span className="cursor-pointer hover:bg-red-500 h-[64px] w-[64px] rounded-[20px] transition-all flex items-center justify-center">
      <img
        src={logOutIcon}
        alt="logout"
        onClick={handleSignOut}
        className="w-[20px]"
      />
    </span>
  );
};

export default Logout;
