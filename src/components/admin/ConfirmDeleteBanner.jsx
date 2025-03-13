import React from "react";
import { deleteBanner } from "../../utils/deleteBanner";

const ConfirmDeleteBanner = ({ setDeleteConfirmation, banner }) => {
  const handleDeleteBanner = async (id) => {
    console.log(id);
    const response = await deleteBanner(banner);

    if (response.success) {
      setDeleteConfirmation(false);
      console.log("Banner deleted successfully");
    } else {
      alert("Error deleting banner");
    }
  };
  return (
    <div className="z-10 w-full min-h-screen flex items-center justify-center  top-0 xsm:top-[78px] absolute left-0 p-4 custom-modal">
      <div className="flex flex-col gap-3 rounded-lg items-center justify-center py-[24px] max-w-[356px] bg-white">
        <span className="text-[24px] font-bold">Delete Banner</span>
        <span className="text-[#000000B2] text-center xsm:text-[12px] px-4 ">
          Are you sure you want to delete this event? This action cannot be
          undone.
        </span>
        <button
          className="btn btn-light"
          onClick={() => setDeleteConfirmation(false)}
        >
          {" "}
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteBanner(banner)}
        >
          {" "}
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteBanner;
