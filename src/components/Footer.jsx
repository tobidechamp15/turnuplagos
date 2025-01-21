import React from "react";
import faceImg from "../assets/faceImg.svg";
import twitImg from "../assets/twitImg.svg";
import instaImg from "../assets/instaImg.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white py-4 flex flex-col items-center gap-[30px]">
      <hr className="text-white !border-2 !border-white w-full" />
      <div className="flex flex-col gap-[24px] items-center w-full">
        <div className="flex justify-between gap-[45px]">
          <Link to=" https://www.facebook.com/TurnUpLagos/">
            <img src={faceImg} alt="Facebook Icon" className="cursor-pointer" />
          </Link>
          <Link to="https://x.com/TurnUpLag">
            <img src={twitImg} alt="Twitter Icon" className="cursor-pointer" />
          </Link>
          <Link to="https://www.instagram.com/turnuplag?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
            <img
              src={instaImg}
              alt="Instagram Icon"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <span className="!text-sm">
          Copyright © Turnuplagos | All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
