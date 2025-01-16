import { faNairaSign, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import createTickets, {
  fetchEventById,
  updateTicketQuantity,
} from "../utils/eventsFetched";

const TicketSale = ({ eventId, closeTicket }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});
  const [email, setEmail] = useState(""); // To track the email input for free ticket registration
  const [emailReg, setEmailReg] = useState(false);
  const [freeTicketCounts, setFreeTicketCounts] = useState({
    "Free Ticket": 0,
  });
  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      const response = await fetchEventById(eventId);
      if (response.success) {
        setEvent(response.event);
        // Initialize ticket counts to 0 for each category
        const initialCounts = {};
        response.event.ticketInfo.categories.forEach((category) => {
          initialCounts[category.name] = 0;
        });
        setTicketCounts(initialCounts);
      } else {
        setError(response.error);
      }
      setLoading(false);
    };

    getEvent();
  }, [eventId]);

  const handleAddTicket = (categoryName) => {
    setTicketCounts((prev) => ({
      ...prev,
      [categoryName]: prev[categoryName] + 1,
    }));
  };

  const handleRemoveTicket = (categoryName) => {
    setTicketCounts((prev) => ({
      ...prev,
      [categoryName]: Math.max(prev[categoryName] - 1, 0), // Prevent negative values
    }));
  };

  const calculateTotalPrice = () => {
    if (!event) return 0;
    return event.ticketInfo.categories.reduce((total, category) => {
      return total + category.price * (ticketCounts[category.name] || 0);
    }, 0);
  };
  const handlePurchase = async (email) => {
    const totalPrice = calculateTotalPrice();

    // Check if any ticket is selected
    const ticketsSelected = Object.values(ticketCounts).some(
      (count) => count > 0
    );

    if (!ticketsSelected) {
      alert("Please select at least one ticket.");
      setEmailReg(false);
      return;
    }

    if (totalPrice === 0) {
      // Allow free ticket processing
      alert(
        "You have selected free tickets. Proceeding to finalize registration..."
      );
      // Handle free ticket logic (e.g., record email and tickets in the database)
      const purchaseDetails = Object.entries(ticketCounts).map(
        ([categoryName, count]) => ({
          categoryName,
          count,
        })
      );

      try {
        const ticketResponse = await updateTicketQuantity(
          eventId,
          purchaseDetails
        );
        if (ticketResponse.success) {
          alert("Tickets successfully registered!");
          closeTicket();
        } else {
          alert(`Error registering tickets: ${ticketResponse.error}`);
        }
      } catch (err) {
        console.error("Error during ticket update:", err);
        alert("An error occurred while registering your tickets.");
      }

      return;
    }

    if (!window.PaystackPop) {
      alert(
        " Paystack is currently unavailable. Please try again later, or reload this current page."
      );
      return;
    }

    const handler = window.PaystackPop.setup({
      key: "pk_test_320aaa9b190250ca1755773b0e5e47e1a6eab29e", // Replace with your Paystack public key
      email: email, // Customer's email
      amount: totalPrice * 100, // Convert to kobo (₦1 = 100 kobo)
      currency: "NGN",
      ref: `ref-${Math.floor(Math.random() * 1000000000)}`, // Unique transaction reference
      callback: function (response) {
        alert(
          `Payment successful! Transaction reference: ${response.reference}`
        );

        const updateTickets = async () => {
          try {
            const purchaseDetails = Object.entries(ticketCounts).map(
              ([categoryName, count]) => ({
                categoryName,
                count,
              })
            );
            await createTickets(eventId, purchaseDetails, email);

            const ticketResponse = await updateTicketQuantity(
              eventId,
              purchaseDetails
            );
            if (ticketResponse.success) {
              alert("Tickets successfully purchased!");
              closeTicket();
            } else {
              alert(`Error updating tickets: ${ticketResponse.error}`);
            }
          } catch (err) {
            console.error("Error during ticket update:", err);
            alert("An error occurred while updating your tickets.");
          }
        };

        updateTickets();
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });

    handler.openIframe(); // Open the Paystack payment modal
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    handlePurchase(email);
  };
  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;
  const handleAddFreeTicket = async (ticketType) => {
    if (ticketType === "Free Ticket") {
      const newCount = freeTicketCounts[ticketType] + 1;

      // Update the local state
      setFreeTicketCounts((prev) => ({ ...prev, [ticketType]: newCount }));
    }
  };

  const handleRemoveFreeTicket = async (ticketType) => {
    if (ticketType === "Free Ticket" && freeTicketCounts[ticketType] > 0) {
      const newCount = freeTicketCounts[ticketType] - 1;

      // Update the local state
      setFreeTicketCounts((prev) => ({ ...prev, [ticketType]: newCount }));
    }
  };

  return (
    <div className="h-screen fixed flex items-center justify-center top-0 left-0 w-full bg-[#00000067]">
      <div className="bg-[#180707] text-white border !border-[#FFDE00] flex flex-col xsm:w-[80%] sm:w-[70%] md:w-[400px] min-h-[400px] rounded-2xl mx-1">
        <div className="flex justify-between items-center py-4 px-3">
          <FontAwesomeIcon
            icon={faX}
            onClick={closeTicket}
            className="cursor-pointer"
          />
          <p>Buy Ticket</p>
          <span></span>
        </div>
        {event && (
          <div className="p-4 pt-0">
            <span>{event.eventFormData.name}</span>
            {event.ticketInfo.ticketType === "Paid" && (
              <ul className="flex flex-col gap-2 mt-1">
                {event.ticketInfo.categories.map((category, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center mb-3 mt-2 gap-4"
                  >
                    <div className="flex justify-between w-full">
                      <span>
                        {category.name} - {category.price}
                      </span>
                      <span className="text-gray-400">
                        ( {category.quantity} available)
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2 w-full">
                      <button
                        onClick={() => handleRemoveTicket(category.name)}
                        className="btn btn-light px-3 py-2"
                      >
                        -
                      </button>
                      <span className="cat-name">
                        {ticketCounts[category.name]}
                      </span>
                      <button
                        onClick={() => handleAddTicket(category.name)}
                        className="btn btn-light px-3 py-2"
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}{" "}
            {event.ticketInfo?.ticketType === "Free" && (
              <div>
                <span>Free Tickets - ₦0.00</span>
                <div className="flex justify-between items-center gap-2 w-full mt-2">
                  <button
                    onClick={() => handleRemoveFreeTicket("Free Ticket")}
                    className="btn btn-light px-3 py-2"
                    aria-label="Remove free ticket"
                  >
                    -
                  </button>
                  <span className="cat-name">
                    {freeTicketCounts["Free Ticket"]}
                  </span>
                  <button
                    onClick={() => handleAddFreeTicket("Free Ticket")}
                    className="btn btn-light px-3 py-2"
                    aria-label="Add free ticket"
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            {emailReg && (
              <div className="fixed top-0 left-0 w-full px-2 h-screen bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white bg-[#180707] border !border-[#FFDE00] py-[44px] p-4 rounded-lg m-2">
                  <div className="flex justify-between items-center mb-4">
                    <FontAwesomeIcon
                      icon={faX}
                      onClick={() => setEmailReg(false)}
                    />
                    <span> Ticket Payment</span>
                  </div>
                  <form onSubmit={handleEmailSubmit}>
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="email" className="text-[#FFFFFF80]">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 rounded-lg bg-transparent border !border-[#FFFFFF80]"
                      />
                    </div>
                    <div className="text-[12px] my-4 !text-[#FFFFFF80]">
                      Enter email to complete payment processes.
                    </div>
                    <button type="submit" className="btn btn-light w-full mt-3">
                      Proceed
                    </button>
                  </form>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-2">
              <p>Total</p>
              <span className="border bg-transparent rounded-lg px-2 py-1 border-gray-500 outline-none text-[#FFFFFFB2]">
                <FontAwesomeIcon icon={faNairaSign} /> {calculateTotalPrice()}
              </span>
            </div>
            <button
              onClick={() => setEmailReg(true)}
              className="btn btn-light w-full mt-4"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

TicketSale.propTypes = {
  eventId: PropTypes.string.isRequired,
  closeTicket: PropTypes.func.isRequired,
};

export default TicketSale;
