import React from "react";
import faceImg from "../assets/faceImg.svg";
import twitImg from "../assets/twitImg.svg";
import instaImg from "../assets/instaImg.svg";

const Footer = () => {
  return (
    <div className="w-full my-4 flex flex-col items-center gap-[30px]">
      <hr className="text-white !border-2 !border-white w-full" />
      <div className="flex flex-col gap-[24px] items-center w-full">
        <div className="flex justify-between gap-[45px]">
          <img src={faceImg} alt="Facebook Icon" className="cursor-pointer" />
          <img src={twitImg} alt="Twitter Icon" className="cursor-pointer" />
          <img src={instaImg} alt="Instagram Icon" className="cursor-pointer" />
        </div>
        <span className="!text-sm">
          Copyright © Turnuplagos | All Rights Reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
