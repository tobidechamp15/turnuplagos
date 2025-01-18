import React, { useState } from "react";
import { fetchTicketByReference } from "../utils/eventsFetched";
import TicketCard from "./TicketCard";
import Loader from "./Loader";

const ManageTIcket = () => {
  const [referenceCode, setReferenceCode] = useState("");
  const [ticketInfo, setTicketInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchTicket = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetchTicketByReference(referenceCode);
      if (response.success) {
        console.log(response);
        setTicketInfo(response.tickets);
      }
    } catch (error) {
      alert("Error fetching Ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col my-6 w-full md:px-4 container min-h-screen  md:pt-[18px]">
      ManageTIcket
      <div className="flex flex-col  gap-3 w-2/3 ">
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
