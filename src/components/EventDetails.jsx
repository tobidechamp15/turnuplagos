import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventById } from "../utils/eventsFetched";
// import TicketSale from "./TicketSale";
import "../index.css";
import Loader from "./Loader";
import BeyondLagos from "./BeyondLagos";

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event ID
  // const [openTicket, setOpenTicket] = useState(false);

  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      const response = await fetchEventById(id);
      if (response.success) {
        setEvent(response.event);
        console.log(response.event); // Logging the event after fetching it
      } else {
        setError(response.error);
      }
      setLoading(false);
    };

    getEvent();
  }, [id]);
  // const handleTicketSale = (id) => {
  //   setSelectedEventId(id); // Set the selected event ID
  //   setOpenTicket(true); // Open the TicketSale component
  // };
  if (loading) return <Loader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#000] h-full min-h-screen">
      <div className="container-md ">
        <div className="text-white text-[32px] xsm:text-[16px] p-8">
          Event Details
        </div>

        {event && (
          <section className="flex flex-col md:flex-row gap-4 p-4 items-start justify-center">
            <span className="w-[402px] xs:w-full">
              <img
                src={event.eventMarket.imagePreview}
                className="w-full rounded-xl border border-white"
                alt={event.eventFormData.name}
              />
            </span>
            <div className="flex flex-col gap-3 text-white xsm:w-full event-details">
              <span className="text-xl font-bold">
                {event.eventFormData.name}
              </span>
              <p>{event.eventFormData.description}</p>
              <span className="text-lg font-semibold">Details</span>
              <ul className="list-disc pl-5">
                <li>Venue: {event.eventFormData?.venue ?? "N/A"}</li>
                <li>Date: {event.eventFormData?.date ?? "N/A"}</li>
                <li>Start Time: {event.eventFormData?.start_time ?? "N/A"}</li>
                <li>End Time: {event.eventFormData?.end_time ?? "N/A"}</li>
                <li>
                  Dress Code:{" "}
                  {event.eventFormData?.dress_code ?? "Not specified"}
                </li>
              </ul>
              {/* 
              <span className="text-lg font-semibold">Tickets</span>
              <ul className="list-disc pl-5">
                <li>Tickets: {event.ticketInfo.ticketType}</li>
                {event.ticketInfo.ticketType === "Paid" &&
                  event.ticketInfo.categories.map((category, index) => (
                    <li key={index}>
                      {category.name}: {category.price ?? 0}
                    </li>
                  ))}
              </ul> */}
              {/* {openTicket && (
                <TicketSale
                  eventId={selectedEventId}
                  closeTicket={() => setOpenTicket(false)}
                />
              )} */}
              {/* <section className="w-full flex xsm:flex-col gap-4">
                <button
                  className="btn btn-outline-light w-full"
                  onClick={() =>
                    alert(
                      `Tickets remaining:\n${event.ticketInfo.categories
                        .map((c) => `${c.name}: ${c.quantity}`)
                        .join("\n")}`
                    )
                  }
                >
                  Tickets Remaining
                </button>
                <button
                  className="btn btn-light w-full"
                  onClick={() => handleTicketSale(id)}
                >
                  Buy Ticket
                </button>
              </section> */}
            </div>
          </section>
        )}

        <div className="my-5 text-white">You may also like...</div>
        <hr className="my-3 relative w-full" />
        <BeyondLagos />
      </div>
    </div>
  );
};

export default EventDetails;
