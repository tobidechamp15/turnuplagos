import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideBar from "./components/SideBar";
import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About TUL" },
    { href: "/exploreLagos", label: "Explore Lagos" },
    { href: "/beyondLagos", label: "Beyond Lagos" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="bg-[#180707] container-fluid flex flex-col gap-2 relative">
      {isOpen && <SideBar onClose={() => setIsOpen(false)} />}
      <nav className="flex xsm:fixed xsm:top-0 xsm:left-0 bg-[#180707] px-2 !max-w-full md:justify-around justify-between xsm:pt-[16px] pb-4 md:mt-[48px] items-center xsm:container">
        <div>
          <img src={logo} alt="logo" className="xsm:w-[64px]" />
        </div>
        <div className="gap-[30px] flex xsm:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
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
        <div className="flex gap-2 items-center">
          <NavLink
            to="/promote-selection"
            style={({ isActive }) => ({
              color: isActive ? "#FFDE00" : "#FFFFFFB2", // Active link color
              fontWeight: isActive ? "bold" : "normal", // Active link bold
            })}
            className={({ isActive }) =>
              isActive
                ? " p-2 rounded-lg px-3 h-fit active-link xsm:hidden"
                : "border rounded-lg h-fit py-2 px-3 xs:hidden"
            }
          >
            Promote With us
          </NavLink>
          <button
            aria-label="Toggle Sidebar"
            className="text-[#FFFFFFB2] text-2xl md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </nav>
      <div className="xsm:mt-[55px]">
        <Outlet />
      </div>
    </div>
  );
}
