import React, { useEffect, useState } from "react";
import manAvatar from "../../assets/manAvatar.svg"; // Assuming it's a locally stored asset
import womanAvatar from "../../assets/womanAvatar.svg"; // Assuming it's a locally stored asset
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchAdminByEmail } from "../../utils/fetchAdmin";
import AdminLoader from "./AdminLoader";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrls, setAvatarUrls] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("Logged in user:", user);
      } else {
        console.log("No user is logged in");
      }
    });

    return () => unsubscribe(); // Clean up the subscription when the component unmounts
  }, [auth]);

  useEffect(() => {
    if (user?.email) {
      // Fetch admin data only if user email is available
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetchAdminByEmail(user.email);
          if (response.success) {
            setAdmin(response?.admin);
            console.log(response?.admin);
          }
        } catch (error) {
          console.error("Error fetching admin:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    // Convert avatar images to URL when component is mounted
    const loadAvatars = async () => {
      try {
        const urls = await convertAvatarToUrl([manAvatar, womanAvatar]);
        setAvatarUrls(urls);
      } catch (error) {
        console.error("Error converting images:", error);
      }
    };
    loadAvatars();
  }, []);

  const convertAvatarToUrl = (imageArray) => {
    return Promise.all(
      imageArray.map((image) => {
        // Directly return the image source if it's already a URL or base64 string
        return new Promise((resolve) => {
          resolve(image); // image is already a valid URL or data URL
        });
      })
    );
  };

  // if (!user) return <AdminLoader />;
  if (isLoading) <AdminLoader />;
  return isEdit ? (
    <EditProfileForm
      onSave={() => setIsEdit(false)}
      user={user}
      admin={admin}
      avatarUrls={avatarUrls}
    />
  ) : (
    <div className="profile-section max-w-[528px] w-full min-h-screen">
      <span className="text-[#4A5154]">Profile</span>
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="custom-label">First Name</span>
          <span className="custom-form">{admin?.firstName || "N/A"}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="custom-label">Last Name</span>
          <span className="custom-form">{admin?.lastName || "N/A"}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <span className="custom-label">Email Address</span>
          <span className="custom-form">{user?.email}</span>
        </div>
        <hr />
        <div className="flex flex-col gap-2">
          <span className="custom-label">Your photo</span>
          <span className="text-sm text-gray-600">
            This will be displayed on your profile
          </span>
          <img src={admin?.photoURL} alt="User Avatar" className="w-[100px]" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="custom-label">Role</span>
          <span className="custom-form">Admin</span>
        </div>
        <hr />
        <section className="flex xsm:flex-col gap-3 mt-3">
          {user?.email === "tobidechamp15@gmail.com" && (
            <button className="btn btn-outline-secondary border">
              Manage Admins
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
            Edit Profile
          </button>
        </section>
      </section>
    </div>
  );
};

export default Profile;
