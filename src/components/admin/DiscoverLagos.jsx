import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import bestClubs from "../../assets/bestClubs.svg";
import bestHotels from "../../assets/bestHotels.svg";
import bestFoodsSpot from "../../assets/bestFoodSpots.svg";
import bestBeaches from "../../assets/bestBeaches.svg";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import logo from "../../assets/logo.svg";

const DiscoverLagos = () => {
  const [isOpen, setIsOpen] = useState(false);

  const images = [
    { images: bestClubs, link: "/" },
    { images: bestHotels, link: "/" },
    { images: bestFoodsSpot, link: "/" },
    { images: bestBeaches, link: "/" },
  ];
  return (
    <div className="    bg-[#000] ">
      {" "}
      {isOpen && <SideBar onClose={() => setIsOpen(false)} />}
      <nav className="z-10 flex bg-[#000] xsm:fixed md:hidden xsm:top-0 xsm:left-0 px-2 !max-w-full md:justify-around justify-between xsm:pt-[16px] pb-4 md:mt-[48px] items-center xsm:container">
        <Link to="/">
          <img src={logo} alt="logo" className="xsm:w-[64px] md:w-[100px]" />
        </Link>{" "}
        <button
          aria-label="Toggle Sidebar"
          className="text-[#FFFFFFB2] text-2xl md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </nav>{" "}
      <div className="xsm:mt-[72px] flex min-h-screen container text-white py-[36px] flex-col gap-[36px]">
        <section className="flex gap-5 items-center h-fit">
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1 className="text-xl fo">Discover Lagos</h1>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-4 p-6">
          {images.map((image, index) => (
            <Link to={image.link} key={index}>
              <img src={image.images} alt="" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscoverLagos;
