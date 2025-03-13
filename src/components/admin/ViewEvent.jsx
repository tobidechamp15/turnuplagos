import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEventById } from "../../utils/eventsFetched";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import EditEvent from "./EditEvent";
import EditTicket from "./EditTicket";
import { deleteEvent } from "../../utils/eventsFetched.js";
import ConfirmDelete from "./ConfirmDelete.jsx";
import AdminLoader from "./AdminLoader.jsx";

const ViewEvent = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedEventId, setSelectedEventId] = useState(null); // State to track selected event ID
  const [editEventActive, setEditEventActive] = useState(false);
  const [editTicketActive, setEditTicketActive] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteEvent = async () => {
    const result = await deleteEvent(event);

    if (result.success) {
      console.log("Event deleted successfully!");
      window.location.href = "/dashboard/manage-event"; // Redirect to the manage event page
    } else {
      alert("Failed to delete event:");
    }
  };

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

  if (loading) return <AdminLoader />;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-md ">
      <div className="flex justify-between admin-top py-3 rounded-xl text-center items-center xsm:px-2  p-8">
        <Link to="/dashboard/manage-event">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <span className="xsm:!text-[16px] text-[16px] ">Event</span>
        <span></span>
      </div>

      {event && (
        <section className="flex flex-col md:flex-row gap-4 py-4 items-start justify-center">
          <span className="w-[402px] xs:w-full">
            <img
              src={event.eventMarket.imagePreview}
              className="w-full rounded-xl border border-white"
              alt={event.eventFormData.name}
            />
          </span>
          <div className="flex flex-col gap-3  xsm:w-full event-details">
            <span className="text-xl font-bold">
              {event.eventFormData.name}
            </span>
            <p>{event.eventFormData.description}</p>
            <span className="text-lg font-semibold">Details</span>
            <ul className="list-disc pl-5">
              <li>Venue: {event.eventFormData.venue}</li>
              <li>Date: {event.eventFormData.date}</li>
              <li>Start Time: {event.eventFormData.start_time}</li>
              <li>End Time: {event.eventFormData.end_time}</li>
              <li>Dress Code: {event.eventFormData.dress_code}</li>
            </ul>
            <span className="text-lg font-semibold">Tickets</span>
            <ul className="list-disc pl-5">
              <li>Tickets: {event.ticketInfo.ticketType}</li>
              {event.ticketInfo.categories.map((category, index) => (
                <li key={index}>
                  {category.name}: {category.price}
                </li>
              ))}
            </ul>

            {editEventActive && (
              <EditEvent
                event={event}
                id={id}
                setEditEventActive={setEditEventActive}
              />
            )}
          </div>
          {editTicketActive && (
            <EditTicket
              ticketInfo={event.ticketInfo}
              id={id}
              setEditTicketActive={setEditTicketActive}
            />
          )}
        </section>
      )}
      {deleteConfirmation && (
        <ConfirmDelete
          handleDeleteEvent={handleDeleteEvent}
          setDeleteConfirmation={setDeleteConfirmation}
        />
      )}
      <section className="w-full flex xsm:flex-col gap-4 justify-between">
        <button
          className="btn btn-outline-secondary md:w-full"
          onClick={() => setEditEventActive(true)}
        >
          Edit Event Information
        </button>
        <button
          onClick={() => setEditTicketActive(true)}
          className="btn btn-outline-secondary md:w-full"
        >
          Edit Ticket Information
        </button>
        <button
          className="btn btn-danger md:w-full"
          onClick={() => setDeleteConfirmation(true)}
        >
          Delete Event
        </button>
      </section>
    </div>
  );
};

export default ViewEvent;
