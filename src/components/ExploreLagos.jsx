import React from "react";
import lagosImg from "../assets/lagosImg.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../utils/eventsFetched";
// import TicketSale from "./TicketSale";
import Loader from "./Loader";

const ExploreLagos = () => {
  const [events, setEvents] = useState([]);
  // const [openTicket, setOpenTicket] = useState(false);
  // const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event ID
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetchEvents();
      if (response.success) {
        console.log(response.events);
        //find events with eventMarket.eventFormData.state === "Lagos"

        const featuredEvents = response.events.filter(
          (event) =>
            event.status === "uploaded" &&
            event.eventFormData.state === "Within Lagos"
        );
        console.log(featuredEvents);
        setEvents(featuredEvents || []);
      } else {
        console.error("Failed to fetch events:", response.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Adjust itemsPerPage based on screen size
  useEffect(() => {
    handleFetchEvents();
  }, []);

  // const handleTicketSale = (id) => {
  //   setSelectedEventId(id); // Set the selected event ID
  //   setOpenTicket(true); // Open the TicketSale component
  // };
  if (isLoading) return <Loader />;

  return (
    <div className="mt-16 container !min-h-screen">
      <div className="w-full flex flex-col md:items-center md:flex-row gap-[48px] lg:gap-0 container home-suggest mb-[50px]">
        <img
          src={lagosImg}
          alt="Lagos"
          className="xsm:w-full md:!w-[70%] md:h-[376px]"
        />
        <section className="flex flex-col gap-3 flex-1 text-white">
          <span className="text-[32px]">Places to Visit in Lagos.</span>
          <span className="text-base">
            Discover the vibrant heartbeat of Lagos! From stunning beaches and
            cultural landmarks to the hottest nightlife spots, find your next
            adventure in the city that never sleeps.
          </span>
          <Link
            to="/discover-lagos"
            className="btn btn-light w-fit md:px-[42px]"
          >
            Discover Lagos
          </Link>
        </section>
      </div>{" "}
      <div className="flex gap-[48px] flex-wrap justify-center  mt-16">
        {events.map((event) => (
          <div
            key={event.id}
            className="md:!w-[379px] xsm:w-full  flex-shrink-0 rounded-lg shadow-md p-4 px-0"
          >
            <img
              src={event.eventMarket.imagePreview || "default-image.jpg"}
              alt={event.eventFormData.name}
              className="w-full h-[300px] object-cover rounded-md"
            />
            <div className="mt-4 text-white">
              <p className="event-desc text-sm">
                {event.eventFormData.description}
              </p>
              <p>
                <strong>Ticket: </strong>
                {event.ticketInfo.ticketType}
              </p>
              <p>
                <strong>Venue: </strong>
                {event.eventFormData.venue}
              </p>
              <p>
                <strong>Date: </strong>
                {event.eventFormData.date}
              </p>
              <p>
                <strong>Time: </strong>
                {event.eventFormData.start_time}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 xsm:flex-col">
                <Link
                  to={`/event-details/${event.id}`}
                  className="btn btn-outline-light w-full"
                >
                  View Details
                </Link>
                {/* <button
                  className="btn btn-light w-full"
                  onClick={() => handleTicketSale(event.id)}
                >
                  Buy Ticket
                </button> */}
              </div>
            </div>
          </div>
        ))}
        {/* {openTicket && (
          <TicketSale
            eventId={selectedEventId}
            closeTicket={() => setOpenTicket(false)}
          />
        )} */}
      </div>
      <div className="flex w-full items-center justify-center my-8">
        <button className="btn btn-light px-6 py-2">View More</button>
      </div>
    </div>
  );
};

export default ExploreLagos;
