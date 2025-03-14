import React, { useState, useEffect } from "react";
import { editProfile } from "../../utils/fetchAdmin";
import AdminLoader from "./AdminLoader";

const EditProfileForm = ({ user, onSave, admin, avatarUrls }) => {
  const [firstName, setFirstName] = useState(admin.firstName || "");
  const [lastName, setLastName] = useState(admin.lastName || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Pre-populate fields when user or admin data changes
    if (admin) {
      setFirstName(admin.firstName || "");
      setLastName(admin.lastName || "");
    }

    if (user) {
      setPhotoURL(user.photoURL || "");
    }
  }, [user, admin]);

  const validateForm = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("All fields except photo URL are required.");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const userData = { firstName, lastName, photoURL };
      const response = await editProfile(userData);

      if (response.success) {
        setSuccessMessage("Profile updated successfully!");
        setError(null);
        onSave();
        window.location.reload();
      } else {
        setError("Failed to update profile.");
        setTimeout(() => {
          setError(null);
        }, 2000);
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating your profile.");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) <AdminLoader />;

  return (
    <div className="profile-section max-w-[528px] w-full min-h-screen">
      <div className="flex flex-col gap-3 justify-center w-full h-full p-8">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="cus-label">First Name:</label>
            <input
              type="text"
              value={firstName}
              className="cus-input p-2 border rounded outline-none"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="cus-label">Last Name:</label>
            <input
              type="text"
              value={lastName}
              className="cus-input p-2 border rounded outline-none"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Avatar Selection Section */}
          <div className="flex flex-col gap-2">
            <label className="cus-label">Choose an Avatar:</label>
            <div className="flex gap-4">
              {avatarUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Avatar ${index + 1}`}
                  className={`w-[80px] h-[80px] rounded-full cursor-pointer ${
                    photoURL === url ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => setPhotoURL(url)}
                />
              ))}
            </div>
          </div>

          <div className=" flex-col gap-2 hidden">
            <label className="cus-label">Photo URL (optional):</label>
            <input
              type="text"
              value={photoURL}
              className="cus-input p-2 border rounded outline-none hidden"
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary p-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>

        {successMessage && (
          <p className="text-green-600 mt-4">{successMessage}</p>
        )}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default EditProfileForm;
