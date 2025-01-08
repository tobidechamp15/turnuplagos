import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner1.svg";
import banner2 from "../assets/banner2.svg";
import banner3 from "../assets/banner3.svg";
import banner4 from "../assets/banner4.svg";

const Banner = () => {
  const banners = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 },
    { id: 4, image: banner4 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-full overflow-hidden g flex flex-col items-center justify-center">
      <div
        className="flex w-full transition-transform duration-700 xsm:my-3 "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          //   width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner) => (
          <img
            key={banner.id}
            src={banner.image}
            alt={`banner-${banner.id}`}
            className="w-full xsm:!h-[100px] flex-shrink-0 object-contain"
          />
        ))}
      </div>
      {/* Optional Navigation Dots */}
      <div className=" flex space-x-2 items-center w-full justify-center my-2 transform -translate-x-1/">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full  ${
              currentIndex === index ? "bg-[#FFDE00]" : "bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
