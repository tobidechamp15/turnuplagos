import React, { useState, useEffect } from "react";
import AdminLoader from "./admin/AdminLoader";
import { fetchBanner } from "../utils/eventsFetched";

const Banner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  // const banners = [
  //   { id: 1, image: banner1 },
  //   { id: 2, image: banner2 },
  //   { id: 3, image: banner3 },
  //   { id: 4, image: banner4 },
  // ];
  const handleFetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetchBanner();
      if (response.success) {
        setBanners(response.banner || []);
      } else {
      }
    } catch (error) {
      alert("Error fetching banners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchEvents();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners?.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [banners.length]);
  if (isLoading) return <AdminLoader />;

  return (
    <div className="relative w-full h-full overflow-hidden g flex flex-col items-center justify-center">
      <div
        className="flex w-full transition-transform duration-700 xsm:my-3 "
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          //   width: `${banners.length * 100}%`,
        }}
      >
        {banners &&
          banners
            .filter((bannerItem) => bannerItem.status === "uploaded")
            .map((banner) => (
              <img
                key={banner.id}
                src={banner.imagePreview}
                alt={`banner-${banner.id}`}
                className="w-full xsm:!h-[100px] flex-shrink-0 object-contain"
              />
            ))}
      </div>
      {/* Optional Navigation Dots */}
      <div className=" flex space-x-2 items-center w-full justify-center my-2 transform -translate-x-1/">
        {banners &&
          banners
            .filter((bannerItem) => bannerItem.status === "uploaded")
            .map((_, index) => (
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
