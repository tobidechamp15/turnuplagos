import React, { useState } from "react";
import {
  fetchTicketByReference,
  updateTicketById,
} from "../utils/eventsFetched";
import TicketCard from "./TicketCard";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

const ManageTIcket = () => {
  const [referenceCode, setReferenceCode] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchTicketByReference(referenceCode);
      if (response.success) {
        const tickets = response.tickets;

        // Check if any ticket has already been used
        const alreadyUsed = tickets.some((ticket) => ticket.isUsed);

        if (alreadyUsed) {
          setError("Cannot retrieve ticket. It has already been used.");
          return;
        } else {
          console.log(response.tickets);
          updateTicketByIdFunc(referenceCode);
          setTicketInfo(response.tickets);
        }
      }
    } catch (error) {
      setError("Error fetching Ticket");
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loader />;
  const updateTicketByIdFunc = async (code) => {
    const res = await updateTicketById(code);
    if (res.success) {
      console.log(res);
    }
  };
  return (
    <div className="flex flex-col my-6 w-full md:px-4 container min-h-screen  md:pt-[18px]">
      ManageTIcket
      <div className="flex flex-col  gap-3 w-2/3 ">
        {error && <ErrorMessage message={error} />}
        <form
          className="w-full flex flex-col gap-3 "
          onSubmit={handleFetchTicket}
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-[#FFFFFF80]">
              Reference Code <span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your reference code"
              required
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              className="w-full p-2 rounded-lg bg-transparent text-white border !border-[#FFFFFF80]"
            />
          </div>
          <button className="btn btn-light w-fit" type="submit">
            Submit
          </button>
        </form>
      </div>
      {ticketInfo && <TicketCard ticketInfo={ticketInfo} />}
    </div>
  );
};

export default ManageTIcket;
