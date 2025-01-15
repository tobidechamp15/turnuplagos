import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmDeleteBanner from "./ConfirmDeleteBanner";
import AdminLoader from "./AdminLoader";
import { Link } from "react-router-dom";
import { fetchBanner } from "../../utils/eventsFetched";

const ManageBanner = () => {
  const [banner, setBanner] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewedBanner, setViewedBanner] = useState(null); // Track viewed banner for modal
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const itemsPerPage = 10;

  const handleDeleteBannerClick = (id) => {
    setSelectedBanner(id);
    console.log(id);
    setDeleteConfirmation(true);
  };

  const handleFetchEvents = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchBanner();
      if (response.success) {
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

  const openModal = (bannerItem) => {
    setViewedBanner(bannerItem);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  const totalPages = Math.ceil(banner.length / itemsPerPage);
  const currentBanner = banner.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <AdminLoader />;

  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <span className="text-[#4A5154] ">Banners</span>
        <section className="flex flex-col md:flex-row md:gap-4   my-2 w-fit">
          <Link
            to="/dashboard/admin-upload-banner"
            className="btn btn-light w-fit"
          >
            {" "}
            <FontAwesomeIcon icon={faUpload} /> Upload Banner
          </Link>
        </section>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <>
        {banner.length > 0 ? (
          currentBanner
            .filter((bannerItem) => bannerItem.status === "uploaded")
            .map((bannerItem, index) => (
              <div
                key={bannerItem.id || index}
                className="flex w-full justify-between items-center gap-2 border p-4 rounded-md shadow-sm mb-4"
              >
                <div className="flex gap-2 items-center">
                  <label className="flex items-center gap-2"></label>
                  <span>Banner {bannerItem.name}</span>
                </div>
                {deleteConfirmation && selectedBanner && (
                  <ConfirmDeleteBanner
                    banner={selectedBanner}
                    setDeleteConfirmation={setDeleteConfirmation}
                  />
                )}

                <div className="flex gap-2">
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => openModal(bannerItem)}
                    className="cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDeleteBannerClick(bannerItem)}
                    className="cursor-pointer text-danger"
                  />
                </div>
              </div>
            ))
        ) : (
          <p>No banners available.</p>
        )}

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
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
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
      </>
      {/* Modal for Viewing Banner */}
      {modalIsOpen && (
        <div className="modal-banner flex-grow">
          {viewedBanner && (
            <div className="flex justify-center items-center relative flex-col">
              <img
                src={viewedBanner.imagePreview}
                alt="Banner"
                className="max-w-full max-h-[80vh] object-contain"
              />
              <button onClick={closeModal} className="-top-6 absolute -left-0">
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageBanner;
