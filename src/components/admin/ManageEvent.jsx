import React, { useEffect, useState } from "react";
import { fetchEvents } from "../../utils/eventsFetched";
import { Link } from "react-router-dom";
import AdminLoader from "./AdminLoader";

const ManageEvent = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  const handleFetchEvents = async () => {
    setIsLoading(true);

    try {
      const response = await fetchEvents();
      if (response.success) {
        console.log("object");
        console.log(response.events, "events");
        setEvents(response.events || []);
      } else {
        console.error("Failed to fetch events:", response.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  // Get events for the current page
  const currentEvents = events.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <AdminLoader />;

  return (
    <div>
      <div className="pending-section">
        <span className="text-[#4A5154]">Events</span>
        {events.length > 0 ? (
          currentEvents
            .filter((event) => event.status === "uploaded")
            .map((event, index) => (
              <div
                key={index}
                className="flex flex-col gap-6 w-full items-start mb-4"
              >
                <section className="flex flex-col md:flex-row gap-4 items-start justify-center">
                  <span className="w-[402px] xs:w-full">
                    <img
                      src={event.eventMarket.imagePreview}
                      className="w-full rounded-xl border border-white"
                      alt={event.eventFormData.name}
                    />
                  </span>
                  <div className="flex flex-col gap-3 xsm:w-full event-details">
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
                      {event.ticketInfo.categories.map((category, idx) => (
                        <li key={idx}>
                          {category.name}: {category.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
                <Link
                  to={`/dashboard/manage-event/${event.id}`}
                  className="btn btn-light w-full"
                >
                  View Event
                </Link>
              </div>
            ))
        ) : (
          <p>No Events available..</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`btn ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageEvent;
