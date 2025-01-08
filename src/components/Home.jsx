import React, { useState, useEffect } from "react";

import fire from "../assets/fire.svg";
import lagosImg from "../assets/lagosImg.svg";
import LagosToday from "./LagosToday";
import BeyondLagos from "./BeyondLagos";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { fetchEvents } from "../utils/eventsFetched";
import Banner from "./Banner";

const Home = () => {
  const [events, setEvents] = useState([]);

  const handleFetchEvents = async () => {
    try {
      const response = await fetchEvents();
      if (response.success) {
        // Find events with eventMarket.featureEvent === "Yes"
        const featuredEvents = response.events.filter(
          (event) => event.eventMarket.featureEvent === "yes"
        );
        setEvents(featuredEvents || []);
      } else {
        console.error("Failed to fetch events:", response.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  const formatTimeTo12Hour = (time24) => {
    if (!time24) return ""; // Return an empty string if time is invalid or undefined

    const [hours, minutes] = time24.split(":");
    const hours12 = hours % 12 || 12; // Convert 24-hour time to 12-hour format
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    return `${hours12}:${minutes} ${period}`;
  };

  return (
    <div className="flex flex-col items-center">
      <Banner />
      {/* Hero Section */}
      <div className="hero-text flex flex-col mt-16 text-wrap text-center">
        <span>Where Every Day Feels Like a Party!</span>
      </div>
      <span className="hero-subtext xsm:max-w-[340px] text-center">
        From epic events to must-visit hot spots, let’s turn up the vibe and
        explore Lagos like never before.
      </span>

      {/* Event Carousel */}
      <section className="flex flex-col justify-around my-[40px] w-full container">
        <section className="flex justify-around items-center my-3">
          {/* Left Arrow */}

          {/* Scrollable Container */}
          <div
            className="flex overflow-x-auto scroll-smooth xsm:gap-4 md:gap-[32px] w-full "
            style={{ scrollBehavior: "smooth" }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-col xsm:gap-6 xsm:min-w-[300px] md:min-w-[350px] xsm:max-w-[300px] md:gap-[32px] border border-gray-600 items-center justify-center rounded-xl p-[19px] shrink-0"
              >
                {/* Event Header */}
                <div className="flex justify-between w-full">
                  <div className="flex items-center gap-2">
                    <img src={fire} alt="fire icon" />
                    <span className="text-[#FFFFFF] text-xs">
                      {event.eventFormData.date}
                    </span>
                  </div>
                  <span className="text-[#FFFFFF] text-xs">
                    {formatTimeTo12Hour(event.eventFormData.start_time)}
                  </span>
                </div>

                {/* Event Image */}
                <img
                  src={event.eventMarket.imagePreview || "default-image.jpg"}
                  alt={event.eventFormData.name}
                  className="w-full max-h-[300px] object-cover rounded-lg"
                />

                {/* Event Details */}
                <div className="flex justify-between w-full gap-[10px] items-center overflow-hidden whitespace-nowrap text-ellipsis">
                  <span className="text-white text-xs w-1/2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {event.eventFormData.name}
                  </span>
                  <Link
                    to={`/event-details/${event.id}`}
                    className="btn btn-light p-[6px] w-full flex-1 text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
        </section>
      </section>

      <div className="w-full flex flex-col md:items-center md:flex-row gap-[48px] lg:gap-0 container home-suggest mb-[50px]">
        <img
          src={lagosImg}
          alt="Lagos"
          className="xsm:w-full md:!w-[70%] md:h-[100%] object-cover md:pe-4"
        />
        <section className="flex flex-col gap-3 flex-1 text-white">
          <span className="text-[32px]">Places to Visit in Lagos.</span>
          <span className="text-base">
            Discover the vibrant heartbeat of Lagos! From stunning beaches and
            cultural landmarks to the hottest nightlife spots, find your next
            adventure in the city that never sleeps.
          </span>
          <button className="btn btn-light w-fit md:px-[42px]">
            Discover Lagos
          </button>
        </section>
      </div>

      {/* Other Sections */}
      <LagosToday />
      <BeyondLagos />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
