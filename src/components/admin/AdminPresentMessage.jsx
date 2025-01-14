import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPresentMessage = ({ email }) => {
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
    <>
      <section className="flex justify-center items-center h-screen">
        <div className="message-container ">
          <h2>Password Reset Email Sent</h2>
          <p>
            Admin Profile has already been created for you while trying to
            promote with us
            {/* <Link to="/login">log in</Link> */}
          </p>
          <p>
            Click{" "}
            <span onClick={handleReset} className="text-primary cursor-pointer">
              here
            </span>{" "}
            to reset your password!
          </p>
        </div>
      </section>
    </>
  );
};

export default AdminPresentMessage;
