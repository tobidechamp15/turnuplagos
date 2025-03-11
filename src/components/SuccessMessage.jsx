import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SuccessMessage = ({ message, onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Delay unmounting for smooth animation
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-5 right-5 flex items-center gap-3 p-4 bg-black border border-green-400 text-green-800 rounded-2xl shadow-lg max-w-sm transition-transform duration-500 ease-in-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      }`}
    >
      {/* Success Icon (Heroicons) */}
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>

      <span className="font-medium text-white">
        {message || "Action completed successfully!"}
      </span>

      {/* Close Button (Heroicons) */}
      <button
        onClick={() => setVisible(false)}
        className="ml-auto text-white hover:text-green-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};
// ✅ Add PropTypes validation
SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default SuccessMessage;
