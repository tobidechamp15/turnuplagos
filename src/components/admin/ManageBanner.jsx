import React, { useEffect, useState } from "react";
import { deleteBanner } from "../../utils/eventsFetched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faRepeat,
  faTrash,
  faUpload,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchUploadedBanners,
  replaceUploadedBanner,
} from "../../utils/upload";
import ConfirmDeleteBanner from "./ConfirmDeleteBanner";
import AdminLoader from "./AdminLoader";

const ManageBanner = () => {
  const [banner, setBanner] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewedBanner, setViewedBanner] = useState(null); // Track viewed banner for modal
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const itemsPerPage = 10;

  const handleFetchEvents = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchUploadedBanners();
      if (response.success) {
        setBanner(response.banners || []);
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
  const handleReplaceBanner = async () => {
    if (selectedBanners.length === 0) {
      alert("Please select at least one banner to replace.");
      return;
    }

    try {
      const newBannerData = { uploadedAt: new Date() };
      const response = await replaceUploadedBanner(
        selectedBanners,
        newBannerData
      );

      if (response.success) {
        alert("Selected banners replaced successfully");
        setSelectedBanners([]);
        handleFetchEvents();
      } else {
        alert("Error replacing some banners.");
      }
    } catch (error) {
      console.error("Error replacing banners:", error);
      alert("Error replacing banners.");
    }
  };

  const handleCheckboxChange = (bannerId) => {
    setSelectedBanners((prevSelected) =>
      prevSelected.includes(bannerId)
        ? prevSelected.filter((id) => id !== bannerId)
        : [...prevSelected, bannerId]
    );
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
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Banners Management</h2>
      <section className="flex flex-col md:flex-row md:gap-4 my-4">
        <button
          className="btn btn-light w-full"
          // onClick={}
        >
          {" "}
          <FontAwesomeIcon icon={faUpload} /> Upload Banner
        </button>
        <button className="btn btn-light w-full" onClick={handleReplaceBanner}>
          <FontAwesomeIcon icon={faRepeat} /> Replace Banner
        </button>
      </section>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <>
        {banner.length > 0 ? (
          currentBanner.map((bannerItem, index) => (
            <div
              key={bannerItem.id || index}
              className="flex w-full justify-between items-center gap-2 border p-4 rounded-md shadow-sm mb-4"
            >
              <div className="flex gap-2 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBanners.includes(bannerItem.id)}
                    onChange={() => handleCheckboxChange(bannerItem.id)}
                  />
                </label>
                <span>Banner {index + 1}</span>
              </div>
              {deleteConfirmation && (
                <ConfirmDeleteBanner
                  handleDeleteBanner={deleteBanner}
                  id={bannerItem.id}
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
                  onClick={() => setDeleteConfirmation(true)}
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
