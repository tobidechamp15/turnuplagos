import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import uploadImg from "../assets/uploadImg.svg";

const PromoteBanner = () => {
  const [imagePreview, setImagePreview] = useState(uploadImg);
  const [socialMediaLinks, setSocialMediaLinks] = useState({ link: "" });

  const navigate = useNavigate();

  // Handle image upload and resize to 1440 x 239
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const targetWidth = 1440;
          const targetHeight = 239;

          // Set canvas dimensions
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Draw resized image
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Convert canvas to a base64 image
          const resizedImage = canvas.toDataURL("image/jpeg");
          setImagePreview(resizedImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle social media input change
  const handleSocialMediaChange = (e) => {
    setSocialMediaLinks({
      ...socialMediaLinks,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const formData = {
      socialMediaLinks,
      imagePreview,
    };
    localStorage.setItem("eventMarket", JSON.stringify(formData));

    console.log("Submitted Data:", formData);
    navigate("/event-review");
    // Perform API submission or further processing here
  };

  return (
    <div className="text-white flex flex-col w-full items-center mt-[48px] d">
      <div className="flex flex-col items-center gap-2">
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          onClick={() => document.querySelector('input[type="file"]').click()}
          className={`${
            imagePreview !== uploadImg
              ? "w-full max-w-[1440px]"
              : "w-[300px] xsm:w-full"
          } h-auto object-cover cursor-pointer`}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      <div className="mt-4 md:!w-[70vw] xsm:w-full">
        <label htmlFor="link" className="block mb-2">
          Business Link (optional)
        </label>
        <input
          type="text"
          id="link"
          name="link"
          value={socialMediaLinks.link}
          onChange={handleSocialMediaChange}
          placeholder="Enter your business link"
          className="w-full p-2 rounded-lg bg-transparent border text-white"
        />
      </div>
      <button
        className="btn btn-light mt-4 xsm:w-full"
        onClick={handleSubmit}
        aria-label="Upload Banner"
      >
        Upload Banner
      </button>
    </div>
  );
};

export default PromoteBanner;
