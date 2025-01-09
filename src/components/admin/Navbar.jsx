import React from "react";
import avatar from "../../assets/manAvatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-black p-[24px] nav-bg flex justify-between items-center">
      <div>Hello "name" 👋 </div>
      <div className="flex gap-2 items-center xsm:hidden ">
        <img src={avatar} alt="avatar" className="w-11" />
        <div className="flex flex-col gap-1">
          <span className="text-[14px]">Full Name</span>
          <span className="text-[12px]">Admin</span>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="text-3xl text-blue-700"
        onClick={toggleSidebar}
      />
    </nav>
  );
};

export default Navbar;
