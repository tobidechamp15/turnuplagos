import React from "react";
import avatar from "../../assets/manAvatar.svg";

const Profile = () => {
  return (
    <div className="profile-section max-w-[528px] w-full min-h-screen">
      <span className="text-[#4A5154]">Profile</span>
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="custom-label">First Name</span>
          <span className="custom-form">Ade</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="custom-label">Last Name</span>
          <span className="custom-form">Roy</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <span className="custom-label">Email Address</span>
          <span className="custom-form">aderoy@gmail.com</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <span className="custom-label">Your photo</span>
          <span className="text-sm text-gray-600 ">
            This will be displayed on your profile
          </span>
          <img src={avatar} alt="" className="w-[100px]" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="custom-label">Role</span>
          <span className="custom-form">Admin</span>
        </div>
        <hr />
        <section className="flex xsm:flex-col gap-3 mt-3">
          <button className="btn btn-outline-secondary border">
            Manage Admins
          </button>
          <button className="btn btn-primary">Edit Profile</button>
        </section>
      </section>
    </div>
  );
};

export default Profile;
