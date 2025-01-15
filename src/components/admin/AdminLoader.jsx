import React from "react";

const AdminLoader = () => {
  return (
    <div className=" h-screen !fixed w-full bg-white flex justify-center items-center top-0 left-0">
      <div className="loader  ">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
    </div>
  );
};

export default AdminLoader;
