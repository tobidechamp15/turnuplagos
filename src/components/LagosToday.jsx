import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../utils/eventsFetched";
import TicketSale from "./TicketSale";

const LagosToday = () => {
  const [events, setEvents] = useState([]);
  const [openTicket, setOpenTicket] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event ID

  const handleFetchEvents = async () => {
    try {
      const response = await fetchEvents();
      if (response.success) {
        console.log(response.events);
        //find events with eventMarket.eventFormData.state === "Lagos"

        const featuredEvents = response.events.filter(
          (event) => event.eventFormData.state === "Lagos"
        );
        console.log(featuredEvents);
        setEvents(featuredEvents || []);
      } else {
        console.error("Failed to fetch events:", response.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Adjust itemsPerPage based on screen size
  useEffect(() => {
    handleFetchEvents();
  }, []);

  const handleTicketSale = (id) => {
    setSelectedEventId(id); // Set the selected event ID
    setOpenTicket(true); // Open the TicketSale component
  };

  return (
    <div className="flex flex-col my-6 w-full md:px-4 container">
      {/* Title */}
      <h2 className="text-[32px] text-white mb-6">
        Lagos <span className="text-[#FFDE00]">Events</span>
      </h2>

      {/* Events Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {events.slice(0, 8).map((event) => (
          <div
            key={event.id}
            className="flex flex-col gap-3 md:flex-row rounded-lg shadow-md overflow-hidden"
          >
            {" "}
            <div className="w-full md:w-1/2  h-[303px]">
              <img
                src={event.eventMarket.imagePreview || "default-image.jpg"}
                alt={event.eventFormData.name}
                className="w-full h-full object-cover"
              />{" "}
            </div>
            <div className="mt-4 text-white flex justify-between flex-col w-full flex-1">
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
                <button
                  className="btn btn-light w-full"
                  onClick={() => handleTicketSale(event.id)}
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        ))}
        {openTicket && (
          <TicketSale
            eventId={selectedEventId}
            closeTicket={() => setOpenTicket(false)}
          />
        )}
      </div>

      {/* View More Button */}
      <div className="flex w-full items-center justify-center mt-8">
        <button className="btn btn-outline-light px-6 py-2">View More</button>
      </div>
    </div>
  );
};

export default LagosToday;
