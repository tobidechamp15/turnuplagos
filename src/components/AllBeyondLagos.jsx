import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../utils/eventsFetched";
import TicketSale from "./TicketSale";

const AllBeyondLagos = () => {
  const [events, setEvents] = useState([]);
  const [openTicket, setOpenTicket] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const handleFetchEvents = async () => {
    try {
      const response = await fetchEvents();
      if (response.success) {
        console.log(response.events);
        //find events with eventMarket.eventFormData.state is not "Lagos"

        const featuredEvents = response.events.filter(
          (event) =>
            event.status === "uploaded" &&
            event.eventFormData.state === "Beyond Lagos"
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
    <div className="text-[#FFDE00]  container min-h-screen">
      <div className=" md:text-[32px]">Events</div>{" "}
      <div className="flex gap-[48px] flex-wrap justify-center ">
        {events.map((event) => (
          <div
            key={event.id}
            className="md:w-[379px] xsm:w-full flex-shrink-0 rounded-lg shadow-md p-4 px-0"
          >
            <img
              src={event.eventMarket.imagePreview}
              alt={event.eventFormData.name}
              className="w-full h-[300px] object-cover rounded-md"
            />
            <div className="mt-4 text-base text-white">
              <p className="event-desc text-sm">
                {event.eventFormData.description}
              </p>
              <p>
                <strong>Ticket: </strong>
                {event.ticketInfo.ticketType}
              </p>
              <p>
                <strong>Venue: </strong>
                {event.eventFormData.venue}{" "}
              </p>
              <p>
                <strong>Date: </strong>
                {event.eventFormData.date}{" "}
              </p>
              <p>
                <strong>Time: </strong>
                {event.eventFormData.start_time}{" "}
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
        ))}{" "}
        {openTicket && (
          <TicketSale
            eventId={selectedEventId}
            closeTicket={() => setOpenTicket(false)}
          />
        )}
      </div>
      <div className="flex w-full items-center justify-center my-8">
        <button className="btn btn-outline-light px-6 py-2">View More</button>
      </div>
    </div>
  );
};

export default AllBeyondLagos;
