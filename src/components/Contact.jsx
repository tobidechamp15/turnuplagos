import React, { useState } from "react";
import contactImg from "../assets/contactImg.svg";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear errors
    setSuccessMessage(""); // Reset success message

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
      setSuccessMessage("Thank you! Your message has been sent.");

      // Clear form after submission
      setFormData({ name: "", email: "", message: "" });

      // Optionally, send data to an API
      // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
    }
  };

  return (
    <div className="min-h-screen container mt-4 text-white">
      <h1 className="text-[48px] xsm:text-[24px] mb-6">Contact Us</h1>

      <div className="flex flex-wrap items-center gap-6">
        {/* Contact Image */}
        <div className="w-1/2 xsm:w-full">
          <img
            src={contactImg}
            alt="Contact Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Contact Form Section */}
        <section className="flex flex-col gap-4 flex-1">
          <h2 className="text-[24px] xsm:text-[20px]">For Advert Placements</h2>
          <Link to="/promote-event" className="!underline text-[#FFFFFFB2]">
            Promote an event
          </Link>
          <p className="mt-4">Get in Touch With Us</p>
          <p className="text-[14px]">
            If you have any feedback or suggestions about our site, please take
            a minute to fill out the contact form below, and the TUL Team will
            get in touch 🙂
          </p>

          {/* Contact Form */}
          <form
            className="flex flex-col gap-6 xsm:mt-3"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-base text-[#FFFFFFB2]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base text-[#FFFFFFB2]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-base text-[#FFFFFFB2]">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Type here..."
                value={formData.message}
                onChange={handleChange}
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              ></textarea>
              {errors.message && (
                <p className="text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-light">
              Contact Us
            </button>

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 mt-2">{successMessage}</p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
