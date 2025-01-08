import React from "react";
import contactImg from "../assets/contactImg.svg";

import { Link } from "react-router-dom";
const Contact = () => {
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
          <Link href="/promote-event" className="!underline text-[#FFFFFFB2]">
            Promote an event
          </Link>
          <p className="mt-4">Get in Touch With Us</p>
          <p className="text-[14px]">
            If you have any feedback or suggestions about our site, please take
            a minute to fill out the contact form below, and the TUL Team will
            get in touch 🙂
          </p>

          {/* Contact Form */}
          <form className="flex flex-col gap-6 xsm:mt-3">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-base text-[#FFFFFFB2]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter full name"
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              />
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
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              />
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
                className="border bg-transparent p-2 border-gray-500 outline-none text-[#FFFFFFB2]"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-light ">
              Contact Us
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
