/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link, NavLink } from "react-router-dom";

const ResetPasswordMessage = () => {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="message-container ">
        <h2>Password Reset Email Sent</h2>
        <p>
          An email with instructions to reset your password has been sent to
          your registered email address. Please check your inbox and follow the
          provided instructions to reset your password and{" "}
          <Link to="/login">log in</Link>
        </p>
        <p>
          <p className="text-sm text-gray-600">
            If you don't see the email in your inbox, please check your spam
            folder. If you still haven't received the email, contact our support
            team at{" "}
            <a
              href="mailto:ayomide@turnuplagos.com"
              className="text-blue-500 underline hover:text-blue-700"
            >
              ayomide@turnuplagos.com
            </a>
            .
          </p>

          <div className="text-red-500 w-100">
            Check if the email sent is a correct email if not
          </div>
        </p>
        <p>
          Go <NavLink to="/forgot-password">Back</NavLink>
        </p>
      </div>
    </section>
  );
};

export default ResetPasswordMessage;
