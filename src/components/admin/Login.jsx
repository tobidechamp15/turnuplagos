import React, { useState } from "react";
import logo from "../../assets/blackLogo.svg";
import backGraphic from "../../assets/sideGraphic.svg";
import "../../App.css";
import AdminLoader from "./AdminLoader";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/config";
import ErrorMessage from "../ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!email.endsWith("@turnuplagos.com")) {
        setError("Provided email is not a required admin email");
        setIsLoading(false);
        setTimeout(() => {
          setError(null);
        }, 3000);
      } else {
        const auth = getAuth(app);
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        // if (!user.emailVerified) {
        //   setError("Please verify your email before logging in.");
        //   return;
        // }

        localStorage.setItem("userId", user.uid);
        console.log("User logged in:", user);
        navigate("/dashboard/overview");
      }
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      setTimeout(() => {
        setError(null);
      }, 2000);
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <AdminLoader />;

  return (
    <div className="h-screen flex items-center justify-center w-full md:flex-row flex-col">
      <div className="flex flex-col gap-3 justify-center w-full  h-full p-8 md:w-1/2">
        <img src={logo} alt="Company Logo" className="w-32 mb-4" />
        <span className="text-head text-lg font-semibold text-start">
          Welcome back, Admin
        </span>
        <span className="text-mot text-sm text-start">
          Here’s to another productive session!
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:w-2/3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="cus-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              id="email"
              className="cus-input p-2 border-none rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="cus-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              id="password"
              className="cus-input p-2 border-none rounded outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link to="/forgot-password" className="text-end text-danger">
            Forgot Password?
          </Link>
          {error && <ErrorMessage message={error} />}

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div>
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Click here to sign up
            </Link>
          </span>
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

export default Login;
