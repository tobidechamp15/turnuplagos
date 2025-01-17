import React from "react";
import { Link } from "react-router-dom";

const ViewReferenceCode = () => {
  const referenceCode = localStorage.getItem("referenceCode");
  return (
    <div className="fixed top-0 left-0 w-full px-2 h-screen bg-white bg-opacity-0 flex items-center justify-center gap-1">
      Your reference Code is <strong>{referenceCode} </strong>navigate{" "}
      <Link to="/manage-ticket" className="text-primary ">
        here{" "}
      </Link>
      to get ticket
    </div>
  );
};

export default ViewReferenceCode;
