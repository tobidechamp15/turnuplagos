import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PromoteEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    state: "",
    venue: "",
    date: "",
    start_time: "",
    end_time: "",
    dress_code: "",
    venue_capacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    localStorage.setItem("eventFormData", JSON.stringify(formData)); // Save to localStorage
    console.log(formData);
    alert("Form data saved successfully!");
    navigate("/ticket-info");
  };

  return (
    <div className="container-md mt-[48px] p-0 min-h-screen">
      <span className="text-[32px] text-white mb-6">
        Event <span className="text-[#FFDE00]">Information</span>
      </span>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-3">
        <div className="flex md:flex-row xsm:flex-col w-full">
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="name" className="text-white">
              Event Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="What's the name of the event?"
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="description" className="text-white">
              Event Description <span className="required">*</span>
            </label>
            <input
              type="text"
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a brief, engaging description of your event"
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
        </div>
        <div className="flex md:flex-row xsm:flex-col w-full">
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="state" className="text-white">
              State <span className="required">*</span>
            </label>
            <select
              name="state"
              id=""
              value={formData.start_time}
              required
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            >
              <option value="">Select a state</option>
              <option value="Within Lagos">Within Lagos</option>
              <option value="Beyond Lagos">Beyond Lagos</option>
            </select>
            {/* <input
              type="text"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              placeholder="Which state is the event happening?"
              className="w-full p-2 rounded-lg bg-transparent border"
            /> */}
          </div>
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="venue" className="text-white">
              Venue <span className="required">*</span>
            </label>
            <input
              type="text"
              required
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Where is the event happening?"
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
        </div>
        <div className="flex md:flex-row xsm:flex-col w-full">
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="date" className="text-white">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              required
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="start_time" className="text-white">
              Start Time <span className="required">*</span>
            </label>
            <input
              type="time"
              name="start_time"
              required
              value={formData.start_time}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
        </div>
        <div className="flex md:flex-row xsm:flex-col w-full">
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="end_time" className="text-white">
              End Time <span className="required">*</span>
            </label>
            <input
              type="time"
              required
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-transparent border text-white"
            />
          </div>
          <div className="flex flex-col gap-2 p-2 md:w-1/2">
            <label htmlFor="dress_code" className="text-white">
              Dress Code <span className="required">*</span>
            </label>
            <input
              type="text"
              name="dress_code"
              required
              value={formData.dress_code}
              onChange={handleChange}
              placeholder="Is there a specific dress code? If yes, provide details."
              className="w-full p-2 rounded-lg bg-transparent border"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 p-2 md:w-1/2">
          <label htmlFor="venue_capacity" className="text-white">
            Venue Capacity: <span className="required">*</span>
          </label>
          <input
            type="number"
            name="venue_capacity"
            value={formData.venue_capacity}
            required
            onChange={handleChange}
            placeholder="What is the number of people that the venue can contain?"
            className="w-full p-2 rounded-lg bg-transparent border text-white"
          />
        </div>
        <button type="submit" className="btn btn-light my-2 xsm:w-fit">
          Save and Continue <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </form>
    </div>
  );
};

export default PromoteEvent;
