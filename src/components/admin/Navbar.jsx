import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AdminLoader from "./AdminLoader";
import { fetchAdmins } from "../../utils/fetchAdmin";

const Navbar = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

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
      // Fetch admin data when user email is available
      console.log(user?.email);
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await fetchAdmins(); // Ensure correct function name
          if (response.success) {
            const adminLogged = response.admins.find(
              (admin) => admin.email === user.email
            );

            setAdmin(adminLogged); // Save only the matched admin
            console.log("Logged in Admin:", adminLogged);
          } else {
            console.warn("No matching admin found:", response.error);
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

  if (isLoading) <AdminLoader />;

  return (
    <nav className="bg-black p-[24px] nav-bg flex justify-between items-center">
      <div>Hello {admin?.firstName} 👋 </div>
      <div className="flex gap-2 items-center xsm:hidden ">
        <img src={admin?.photoURL} alt="avatar" className="w-11" />
        <div className="flex flex-col gap-1">
          <span className="text-[14px]">
            {admin?.lastName} {admin?.firstName}
          </span>
          <span className="text-[12px]">Admin</span>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faBars}
        className="text-3xl text-blue-700 flex md:hidden"
        onClick={toggleSidebar}
      />
    </nav>
  );
};

export default Navbar;
