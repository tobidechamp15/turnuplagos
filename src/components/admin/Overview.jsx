import React, { useEffect, useState } from "react";
import {
  deleteBanner,
  deleteEvent,
  fetchBanner,
  fetchEvents,
} from "../../utils/eventsFetched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faX } from "@fortawesome/free-solid-svg-icons";
import { uploadNewBanner, uploadNewEvent } from "../../utils/upload";
import AdminLoader from "./AdminLoader";

import card1 from "../../assets/card1.svg";
import card2 from "../../assets/card2.svg";
import card3 from "../../assets/card3.svg";
import card4 from "../../assets/card4.svg";

const Overview = () => {
  // Fetch events
  const [banner, setBanner] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewedBanner, setViewedBanner] = useState(null); // Track viewed banner for modal
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFetchBanners = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchBanner();
      if (response.success) {
        console.log(response, "response");
        setBanner(response.banner || []);
      } else {
        setErrorMessage("Failed to fetch banners.");
      }
    } catch (error) {
      setErrorMessage("Error fetching banners.");
      console.error("Error fetching banners:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleFetchEvents = async () => {
    try {
      const response = await fetchEvents();
      if (response.success) {
        console.log(response);
        setEvents(response.events || []);
      } else {
        console.error("Failed to fetch events:", response.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    handleFetchEvents();
    handleFetchBanners();
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
  const openModal = (bannerItem) => {
    setViewedBanner(bannerItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteEvent = async (id) => {
    const result = await deleteEvent(id);

    if (result.success) {
      console.log("Event deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete event:");
    }
  };

  const handleDeleteBanner = async (id) => {
    const result = await deleteBanner(id);
    if (result.success) {
      console.log("Banner deleted successfully!");
      window.location.reload();
    } else {
      alert("Failed to delete banner:");
    }
  };

  if (isLoading) return <AdminLoader />;

  return (
    <div>
      <section className="flex w-full gap-3  overflow-x-scroll">
        <img src={card1} alt="" className="" />
        <img src={card2} alt="" />
        <img src={card3} alt="" />
        <img src={card4} alt="" />
      </section>
      <div className="pending-section">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <span className="text-[#4A5154]">Pending</span>
        {banner.length > 0 ? (
          banner
            .filter((bannerItem) => bannerItem.status === "pending") // Filter pending banners
            .map((bannerItem, index) => (
              <div
                key={bannerItem.id || index}
                className="flex flex-col w-full justify-between items-center gap-2 border p-4 rounded-md shadow-sm mb-4"
              >
                <div className="flex justify-between w-full">
                  <span> {bannerItem.name} Banner</span>

                  <div className="flex gap-2">
                    <FontAwesomeIcon
                      icon={faEye}
                      onClick={() => openModal(bannerItem)}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                <section className="flex gap-3 w-full xsm:flex-col">
                  <button
                    className="btn btn-outline-danger w-full "
                    onClick={() => handleDeleteBanner(bannerItem)}
                  >
                    Reject Banner
                  </button>
                  <button
                    className="btn btn-success w-full"
                    onClick={() => uploadNewBanner(bannerItem)}
                  >
                    Upload Banner
                  </button>
                </section>
              </div>
            ))
        ) : (
          <p>No banners available.</p>
        )}
        {modalIsOpen && (
          <div className="modal-banner flex-grow">
            {viewedBanner && (
              <div className="flex justify-center items-center relative flex-col">
                <img
                  src={viewedBanner.imagePreview}
                  alt="Banner"
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <button
                  onClick={closeModal}
                  className="-top-6 absolute -left-0"
                >
                  <FontAwesomeIcon icon={faX} />
                </button>
              </div>
            )}
          </div>
        )}
        {currentEvents
          .filter((bannerItem) => bannerItem.status === "pending") // Filter where status doesn't exist or is not 'uploaded'
          .map((event, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 w-full items-start mb-4"
            >
              <section className="flex flex-col md:flex-row gap-4 items-start justify-center">
                <span className="w-[402px] xs:w-full">
                  <img
                    src={event?.eventMarket.imagePreview}
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
              <section className="flex gap-3 w-full xsm:flex-col">
                <button
                  className="btn btn-outline-danger w-full "
                  onClick={() => handleDeleteEvent(event)}
                >
                  Reject Event
                </button>
                <button
                  className="btn btn-success w-full"
                  onClick={() => uploadNewEvent(event)}
                >
                  Upload Event
                </button>
              </section>
            </div>
          ))}
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

export default Overview;
