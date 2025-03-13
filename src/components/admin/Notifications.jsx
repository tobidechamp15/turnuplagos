import { useEffect, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchNotificationsAndEvents = async () => {
      try {
        // Fetch Notifications
        const notificationsRef = collection(db, "notifications");

        const notificationsQuery = query(
          notificationsRef,
          orderBy("timestamp", "desc")
        );

        const querySnapshot = await getDocs(notificationsQuery);

        const notificationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(notificationsData);
        setNotifications(notificationsData);
        // Fetch Events
        const eventsRef = collection(db, "events");
        const eventsQuery = query(eventsRef, orderBy("uploadedAt", "desc"));
        const eventsSnapshot = await getDocs(eventsQuery);
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);

        // Fetch Admins
        const adminsRef = collection(db, "admins");
        const data = await getDocs(adminsRef);
        const admins = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setAdmins(admins);
        console.log(admins);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      }
    };

    fetchNotificationsAndEvents();
  }, []);

  const getEventNameById = (eventId) => {
    const event = events.find((event) => event.id === eventId);
    return event ? event.eventFormData.name : null;
  };

  const getAdminNameById = (id) => {
    const admin = admins.find((admin) => admin.id === id);
    return admin ? admin.firstName : "Admin anonymous";
  };
  const getAdminAvatar = (id) => {
    const admin = admins.find((admin) => admin.id === id);
    return admin ? admin.photoURL : "";
  };

  const formatTimeDifference = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp.seconds * 1000);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {" "}
          <span className="text-[#4A5154] ">Notifications</span>
          {notifications.map((notification) => {
            const eventName = getEventNameById(
              notification.bannerId || notification.eventId
            );
            const adminName = getAdminNameById(notification.userId);
            const adminAvatar = getAdminAvatar(notification.userId);
            return (
              <li key={notification.id} className="flex gap-2">
                <img src={adminAvatar} alt="" />
                <section>
                  <section className="text-[#475569] text-[12px]">
                    {notification.action}
                  </section>
                  <section className="text-[#334155] text-[14px] font-normal">
                    Admin {adminName} {notification.action}
                    {eventName ? ` for ${eventName}` : ""} on{" "}
                    {new Date(
                      notification.timestamp.seconds * 1000
                    ).toLocaleString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    .
                  </section>
                  <span className="text-[#475569] text-[12px]">
                    {formatTimeDifference(notification.timestamp)}
                  </span>
                </section>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
