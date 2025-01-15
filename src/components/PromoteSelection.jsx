import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import cloudIcon from "../assets/cloudIcon.svg";
import { Link } from "react-router-dom";

const PromoteSelection = () => {
  return (
    <div className="h-screen -mt-[136px]  flex-grow flex items-center justify-center">
      <div className="flex border rounded-2xl p-5 flex-col gap-3">
        <div className="flex gap-3 items-center">
          <img src={cloudIcon} alt="" />
          <div className="flex flex-col gap-1">
            <span className="text-white">Promote with us</span>
            <span className="text-[#FFFFFFB2] text-[12px]">
              Showcase your events or banners to reach the right audience and
              make an impact today!
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-8 mt-5">
          <Link
            to="/promote-event"
            className="btn btn-light w-full flex items-center justify-between"
          >
            <span>Promote an Event</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <Link
            to="/promote-banner"
            className="btn btn-light w-full flex items-center justify-between"
          >
            <span>Promote a Banner</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoteSelection;
