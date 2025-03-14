import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateEvent } from "../../utils/eventsFetched";
import SuccessMessage from "../SuccessMessage";
import ErrorMessage from "../ErrorMessage";

const EditEvent = ({ event, setEditEventActive, id }) => {
  const [formData, setFormData] = useState({
    name: event.eventFormData.name || "",
    description: event.eventFormData.description || "",
    venue: event.eventFormData.venue || "",
    date: event.eventFormData.date || "",
    start_time: event.eventFormData.start_time || "",
    end_time: event.eventFormData.end_time || "",
    dress_code: event.eventFormData.dress_code || "",
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateEvent(id, formData);

    if (response.success) {
      setSuccess("Event updated successfully!");
      setEditEventActive(false);
    } else {
      setError(`Failed to update event `);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  console.log(event);
  return (
    <div className=" w-full min-h-screen  top-0 xsm:top-[78px] absolute left-0 p-4 custom-modal justify-center ">
      {success && <SuccessMessage message={success} />}
      {error && <ErrorMessage message={error} />}
      <form
        className="flex flex-col gap-6 p-6  border border-gray-300 rounded-2xl  bg-white shadow-lg overflow-y-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="md:text-3xl font-semibold text-gray-800 text-center md:mb-6">
          Edit Event
        </h2>
        <div className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Event Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            ></textarea>
          </label>

          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Venue Capacity</span>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </label>
          <div className="flex gap-2 xsm:flex-col">
            <label className="flex flex-col gap-2">
              <span className="font-medium text-gray-700">Date</span>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-medium text-gray-700">Start Time</span>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-medium text-gray-700">End Time</span>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </label>
          </div>
          <label className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Dress Code</span>
            <input
              type="text"
              name="dress_code"
              value={formData.dress_code}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </label>
        </div>
        <div className="flex gap-6 justify-end">
          <button
            type="button"
            onClick={() => setEditEventActive(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-[#4F46E5] text-white hover:bg-purple-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

EditEvent.propTypes = {
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func, // Optional callback to close the modal
};

export default EditEvent;
