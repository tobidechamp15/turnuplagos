import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = ({ onClose }) => {
  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About TUL" },
    { href: "/exploreLagos", label: "Explore Lagos" },
    { href: "/beyondLagos", label: "Beyond Lagos" },
    { href: "/contact", label: "Contact" },
  ];
  const navigate = useNavigate();
  const handlePromoteEvent = () => {
    onClose();
    navigate("/promote-event");
  };

  return (
    <div className="h-screen z-10 bg-[#180707] fixed w-full left-0 p-4 md:hidden gap-5 flex flex-col">
      <div className="flex flex-col items-start">
        <FontAwesomeIcon
          icon={faX}
          onClick={onClose}
          className="p-[16px] cursor-pointer text-white text-xl"
        />
        <div className="flex flex-col gap-5 mt-[36px]">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              onClick={onClose}
              to={link.href} // Corrected prop
              className="text-[#FFFFFFB2] hover:text-[#FFDE00]"
              style={({ isActive }) => ({
                color: isActive ? "#FFDE00" : "#FFFFFFB2", // Active link color
                fontWeight: isActive ? "bold" : "normal", // Active link bold
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
      <hr className="text-white !border-2 !border-white w-full" />
      <div className="flex items-center w-full justify-center">
        <button
          className="btn btn-outline-light w-full"
          onClick={handlePromoteEvent}
        >
          Promote With us
        </button>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  onClose: PropTypes.func.isRequired, // Add PropTypes validation
};

export default SideBar;
