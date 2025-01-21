import React from "react";
import { Link } from "react-router-dom";

const ViewReferenceCode = () => {
  const referenceCode = localStorage.getItem("referenceCode");
  return (
    <div className="fixed top-0 left-0 w-full px-2 h-screen bg-white bg-opacity-0 flex items-center flex-col justify-center gap-1 text-center md:!px-[30%]">
      <div>
        <strong> Important:</strong> Your reference code is{" "}
        <strong>{referenceCode} </strong>.
      </div>
      Tickets can only be generated once, so please copy and save this code or
      download it to ensure you have it ready when needed. Click
      <div>
        <Link to="/manage-ticket" className="text-primary ">
          {" "}
          here{" "}
        </Link>
        to proceed and get your ticket.
      </div>
    </div>
  );
};

export default ViewReferenceCode;
