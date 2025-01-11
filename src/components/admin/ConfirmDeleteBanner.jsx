import React from "react";

const ConfirmDeleteBanner = ({
  setDeleteConfirmation,
  handleDeleteBanner,
  id,
}) => {
  return (
    <div className="z-10 w-full min-h-screen flex items-center justify-center  top-0 xsm:top-[78px] absolute left-0 p-4 custom-modal">
      <div className="flex flex-col gap-3 rounded-lg items-center justify-center py-[24px] max-w-[356px] bg-white">
        <span className="text-[24px] font-bold">Delete Event</span>
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
          onClick={() => handleDeleteBanner(id)}
        >
          {" "}
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteBanner;
