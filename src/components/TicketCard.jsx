import React, { useEffect, useState } from "react";
import blackLogo from "../assets/blackLogo (2).svg";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/config";

const TicketCard = ({ ticketInfo }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, orderBy("uploadedAt", "desc"));
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const getEventNameById = (eventId) => {
    const event = events?.find((event) => event.id === eventId);
    return event ? event.eventFormData.name : null;
  };
  const getEventVenueById = (eventId) => {
    const event = events?.find((event) => event.id === eventId);
    return event ? event.eventFormData.venue : null;
  };
  const getEventTimeById = (eventId) => {
    const event = events?.find((event) => event.id === eventId);
    return event ? event.eventFormData.start_time : null;
  };
  const getEventDateById = (eventId) => {
    const event = events?.find((event) => event.id === eventId);
    return event ? event.eventFormData.date : null;
  };

  return (
    <div className="text-white w-full my-4">
      <div className="flex gap-4 flex-wrap">
        {ticketInfo?.map((ticket) => {
          const eventName = getEventNameById(ticket.eventId || ticket.eventId);
          const eventTime = getEventTimeById(ticket.eventId || ticket.eventId);
          const eventDate = getEventDateById(ticket.eventId || ticket.eventId);
          const eventVenue = getEventVenueById(
            ticket.eventId || ticket.eventId
          );
          return (
            <div
              key={ticket.id}
              className="ticket-bg max-w-[400px] w-full py-12 px-6  text-black rounded-2xl"
            >
              <img src={blackLogo} alt="Logo" className="mb-4" />
              <div
                className="custom-ticket flex flex-col gap-3
              "
              >
                <div>
                  <span>Event Name</span>
                  {eventName && <p className="mt-2 text-sm">{eventName}</p>}
                </div>
                <div>
                  <span>Venue</span>
                  {eventVenue && <p className="mt-2 text-sm">{eventVenue}</p>}
                </div>
                <div>
                  <span>Date</span>
                  {eventDate && <p className="mt-2 text-sm">{eventDate}</p>}
                </div>
                <div>
                  Time
                  {eventTime && <p className="mt-2 text-sm">{eventTime}</p>}
                </div>
                <span className="text-lg font-semibold">
                  {ticket.categoryName}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketCard;
