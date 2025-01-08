import React, { useState } from "react";
import uploadImg from "../assets/uploadImg.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const EventMarket = () => {
  const [featureEvent, setFeatureEvent] = useState("");
  const [imagePreview, setImagePreview] = useState(uploadImg);
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    instagram: "",
    snapchat: "",
    twitter: "",
  });

  // Handle event selection (feature or not)
  const handleOptionChange = (e) => {
    setFeatureEvent(e.target.value);
  };

  // Handle image upload and resize
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
          const maxWidth = 600;
          const maxHeight = 300;

          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const aspectRatio = width / height;
            if (width > maxWidth) {
              width = maxWidth;
              height = width / aspectRatio;
            }
            if (height > maxHeight) {
              height = maxHeight;
              width = height * aspectRatio;
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          const resizedImage = canvas.toDataURL("image/jpeg");
          setImagePreview(resizedImage);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle social media link changes
  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setSocialMediaLinks((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = () => {
    if (!featureEvent) {
      alert("Please select whether you want to feature your event.");
      return; // Stop submission if feature event is not selected
    }
    const formData = {
      featureEvent,
      socialMediaLinks,
      imagePreview,
    };
    localStorage.setItem("eventMarket", JSON.stringify(formData));

    console.log("Submitted Data:", formData);
    navigate("/event-review");
    // Perform API submission or further processing here
  };

  return (
    <div className="container-md mt-[48px] p-0">
      <span className="text-[32px] text-white mb-6">
        Event <span className="text-[#FFDE00]">Marketing</span>
      </span>
      <div className="flex xsm:flex-col gap-2 my-3 md:flex-row">
        <div className="flex flex-col items-center gap-2">
          <img
            src={imagePreview}
            alt="Uploaded Preview"
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="md:w-[403px] md:h-[200px object-cover cursor-pointer"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-white hidden"
          />
        </div>
        <div className="container-md mt-4 rounded-lg text-[#FFFFFFB2] flex flex-col">
          <h3 className="text-sm mb-2">Feature Event</h3>
          <span className="text-sm my-2">
            Would you like to feature your event on TurnUpLagos?
          </span>
          <div className="flex gap-4 xsm:flex-col text-sm text-white mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featureEvent"
                value="yes"
                onChange={handleOptionChange}
                className="accent-[#FFDE00]"
              />
              <span>Yes, I want to feature event</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featureEvent"
                value="no"
                onChange={handleOptionChange}
                className="accent-[#FFDE00]"
              />
              <span>No, I do not want to feature event</span>
            </label>
          </div>

          <span className="text-base my-2">
            Note: Featuring your event will make it more prominent and attract
            more attention. An additional fee applies for this service.
          </span>
          <div>
            <span className="text-sm text-gray-500">
              Social media (optional)
              <div className="flex xsm:flex-col gap-2 mt-2">
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram Link"
                  value={socialMediaLinks.instagram}
                  onChange={handleSocialMediaChange}
                  className="w-full p-2 rounded-lg bg-transparent border"
                />
                <input
                  type="text"
                  name="snapchat"
                  placeholder="Snapchat Link"
                  value={socialMediaLinks.snapchat}
                  onChange={handleSocialMediaChange}
                  className="w-full p-2 rounded-lg bg-transparent border"
                />
                <input
                  type="text"
                  name="twitter"
                  placeholder="X Link"
                  value={socialMediaLinks.twitter}
                  onChange={handleSocialMediaChange}
                  className="w-full p-2 rounded-lg bg-transparent border"
                />
              </div>
            </span>
          </div>
          <button className="btn btn-light w-fit mt-4" onClick={handleSubmit}>
            Save and Continue <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventMarket;
