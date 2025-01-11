import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import activeEventIcon from "../../assets/activeEventsIcon.svg";
import activeBannerIcon from "../../assets/activeBannerIcon.svg";
import activeOverviewIcon from "../../assets/activeOverviewIcon.svg";
import activeNotificationIcon from "../../assets/activeNotificationIcon.svg";
import bannerIcon from "../../assets/bannerIcon.svg";
import eventsIcon from "../../assets/eventsIcon.svg";
import overviewIcon from "../../assets/overviewIcon.svg";
import logo from "../../assets/logo.svg";
import notificationIcon from "../../assets/notificationIcon.svg";
import Logout from "./Logout";
import "../../App.css";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const sidebarRef = useRef(null); // Ref for sidebar

  // Define dropdown data for both roles
  const dropdownData = [
    {
      activeLogo: activeOverviewIcon,
      inactiveLogo: overviewIcon,
      title: "Jobs",
      linkTo: "/dashboard/overview",
      roles: ["student", "organization"], // Accessible to both roles
    },
    {
      activeLogo: activeEventIcon,
      inactiveLogo: eventsIcon,
      title: "Overview",
      linkTo: "/dashboard/manage-event",
      roles: ["student", "organization"], // Accessible to both roles
    },
    {
      activeLogo: activeBannerIcon,
      inactiveLogo: bannerIcon,
      title: "Banner",
      linkTo: "/dashboard/manage-banners",
      roles: ["organization"], // Accessible to organization only
    },
    {
      activeLogo: activeNotificationIcon,
      inactiveLogo: notificationIcon,
      title: "Applications",
      linkTo: "/dashboard/notification",
      roles: ["student", "organization"], // Accessible to students only
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar state
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false); // Close sidebar when clicking outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <section className="w-100 bg-white">
      {/* Sidebar */}
      <section
        className={`flex  w-fit overflow-auto bg-white border-r text-left text-[16px] font-medium leading-[24px] justify-between h-full flex-col max-h-screen !overflow-y-auto side-shadow z-50 fixed transition-all ease-in-out duration-700 ${
          sidebarOpen ? "left-0" : "xsm:-left-[104px]"
        }`}
        ref={sidebarRef}
        id="side-bar"
      >
        <div className="w-100 flex flex-col self-center gap-2 h-full">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center my-6 gap-2 px-4 justify-center"
          >
            <img src={logo} className="w-[36px]" alt="Logo" />
          </Link>

          {/* Dropdown Menu */}
          <div className="flex flex-col w-100 h-full justify-around gap-3 px-4 items-center">
            <section className="flex flex-col gap-3">
              <ul className="list mt-2 w-full flex gap-4 flex-col items-center py-2 transition-all ease-in-out duration-500">
                {dropdownData.map((dropdown) => (
                  <NavLink
                    key={dropdown.title}
                    to={dropdown.linkTo}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "active-tab bg-[#FFC1301A] border-[#FFC130] text-black"
                          : "inActive-tab text-[#667085]"
                      } flex w-full gap-3 py-2 px-3 hover:bg-gray-300 rounded-[8px]`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <img
                          src={
                            isActive
                              ? dropdown.activeLogo
                              : dropdown.inactiveLogo
                          }
                          alt={`${dropdown.title} icon`}
                        />
                      </>
                    )}
                  </NavLink>
                ))}
              </ul>
            </section>

            {/* Logout */}
            <Logout />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-col md:ms-[106px] overflow-y-auto pb-4 min-h-screen md:relative">
        <Navbar toggleSidebar={toggleSidebar} />
        {/* <div className="flex md:hidden w-100 py-3 items-center justify-between top-bar px-9">
          <img
            src={logo}
            onClick={toggleSidebar}
            alt="Menu Icon"
            className="cursor-pointer text-3xl text-blue-700"
          />
          <FontAwesomeIcon
            icon={faBars}
            className="text-3xl text-blue-700"
            onClick={toggleSidebar}
          />
        </div> */}
        <div className="pt-[24px] md:px-9 overflow-y-auto xsm:px-2 ">
          <Outlet />
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
