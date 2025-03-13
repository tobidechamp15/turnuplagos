import React, { useEffect, useState } from "react";
import blackLogo from "../assets/blackLogo (2).svg";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase/config";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketCard = ({ ticketInfo }) => {
  const [events, setEvents] = useState([]);
  const printRefs = React.useRef([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsRef = collection(db, "events");
      const eventsQuery = query(eventsRef, orderBy("uploadedAt", "desc"));
      const eventsSnapshot = await getDocs(eventsQuery);
      const eventsData = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  const getEventDataById = (eventId) => {
    return events?.find((event) => event.id === eventId);
  };

  const handleDownloadPDF = async (index) => {
    const element = printRefs.current[index];
    if (!element) {
      return;
    }

    // Make sure the content is rendered before capturing
    setTimeout(async () => {
      const canvas = await html2canvas(element, {
        scale: 2, // Optional: Increase scale for better quality
        logging: true, // Optional: Log rendering info
        backgroundColor: null, // Optional: Ensure transparent background
      });

      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Adjust image placement and size
      pdf.addImage(data, "PNG", 0, 0, pageWidth, pageHeight); // Adjust based on your content size
      pdf.save("tickets.pdf");
    }, 100); // Delay to ensure content is rendered
  };

  return (
    <div className="text-white w-full my-4">
      <div className="flex gap-4 flex-wrap">
        {ticketInfo?.map((ticket, index) => {
          const event = getEventDataById(ticket.eventId || ticket.eventId);
          const eventName = event ? event.eventFormData.name : null;
          const eventTime = event ? event.eventFormData.start_time : null;
          const eventDate = event ? event.eventFormData.date : null;
          const eventVenue = event ? event.eventFormData.venue : null;

          return (
            <div className="flex flex-col w-fit">
              {" "}
              <div
                ref={(el) => (printRefs.current[index] = el)}
                key={ticket.id}
                className="ticket-bg max-w-[400px] md:min-w-[400px] w-full py-12 px-6 text-black rounded-2xl"
              >
                <img src={blackLogo} alt="Logo" className="mb-4" />
                <div className="custom-ticket flex flex-col gap-3">
                  <div>
                    <span>Event Name</span>
                    {eventName && <p className="mt-2 text-sm">{eventName}</p>}
                  </div>
                  <div>
                    <span>Venue</span>
                    {eventVenue && <p className="mt-2 text-sm">{eventVenue}</p>}
                  </div>
                  <div>
                    <span>Date</span>
                    {eventDate && <p className="mt-2 text-sm">{eventDate}</p>}
                  </div>
                  <div>
                    <span>Time</span>
                    {eventTime && <p className="mt-2 text-sm">{eventTime}</p>}
                  </div>
                  <div className="text-lg font-semibold">
                    <span>Ticket Type</span>
                    <p>{ticket.categoryName}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDownloadPDF(index)}
                className="btn btn-primary my-3 w-fit"
              >
                Download PDF
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketCard;
