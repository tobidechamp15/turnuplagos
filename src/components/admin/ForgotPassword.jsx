import React from "react";
import logo from "../../assets/blackLogo (2).svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Get the Auth instance
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        navigate("/reset-message");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-100 flex flex-col  items-center h-screen  justify-center lg">
      <div className="flex flex-col xs:h-full  xs:w-full xs:mx-1 w-[60%] py-[35%] gap-5 form-width md:w-[50%] lg:w-[45%]    p-[5%] md:p-[5%] shadow-lg overflow-auto">
        <NavLink to="/" className="flex flex-col justify-center w-full enter">
          <img src={logo} alt="logo" className="w-[150px]" />
        </NavLink>
        <div className="text-xl flex flex-col gap-3   w-full   ">
          Forgot Password?
          <span className="text-sm text-gray-600">
            Enter your email address and we will send you the instructions for
            the password recovery
          </span>
        </div>
        <form
          onSubmit={handleReset}
          className="flex flex-col gap-4 text-black  items-center justify-center self-center w-full md:w-2/3"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="cus-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="cus-input p-2 border-none rounded outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-outline-primary ">
            Reset Password
          </button>
        </form>
        <div className="text-gray-400 flex gap-1 text-center w-100 justify-center items-end h-100">
          Back to
          <NavLink className="text-blue-500" to="/login">
            Log in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
