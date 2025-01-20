import React from "react";
import newsImg from "../assets/newsImg.svg";

const Newsletter = () => {
  return (
    <div className="flex flex-col mt-4 md:flex-row items-center justify-center py-[50px] bg-black px-6 w-full">
      <section className="flex flex-col  h-full md:p-4 gap-4 justify-between items-start">
        <span className="text-2xl text-white">
          Stay Informed with Our Newsletter
        </span>
        <span className="text-[#FFFFFFB2]">
          Subscribe to receive the latest updates, event news, and exclusive
          offers.
        </span>
        <form className="flex flex-col gap-4 w-full pe-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base text-white">
              Email Address<map className="required"> *</map>
            </label>
            <input
              type="email"
              name="email"
              id=""
              required
              className="!border !bg-transparent p-2 border-gray-500 outline-none text-gray-600"
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Subscribe
          </button>
        </form>
      </section>
      <span className="h-full xsm:hidden">
        <img src={newsImg} alt="newsImg" />
      </span>
    </div>
  );
};

export default Newsletter;
