import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideBar from "./components/SideBar";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About TUL" },
    { href: "/exploreLagos", label: "Explore Lagos" },
    { href: "/beyondLagos", label: "Beyond Lagos" },
    { href: "/manage-ticket", label: "Manage Tickets" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className="bg-[#180707] container-fluid flex flex-col gap-2 relative home-sugg">
      {isOpen && <SideBar onClose={() => setIsOpen(false)} />}
      <nav className="z-10 flex bg-[#180707] xsm:fixed xsm:top-0 xsm:left-0 px-2 !max-w-full md:justify-around justify-between xsm:pt-[16px] pb-4 md:mt-[48px] items-center xsm:container">
        <Link to="/">
          <img src={logo} alt="logo" className="xsm:w-[64px] md:w-[100px]" />
        </Link>
        <div className="gap-[30px] flex xsm:hidden md:gap-[10px] lg:gap-[30px] md:m">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className="text-[#FFFFFFB2] hover:text-[#FFDE00] !w-fit"
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
                ? " p-2 rounded-lg px-3 h-fit active-link xsm:hidden  w-fit text-center"
                : "border rounded-lg h-fit btn btn-outLine-light xs:hidden  w-fit text-center"
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
      <div className="xsm:mt-[80px]">
        <Outlet />
      </div>
    </div>
  );
}
