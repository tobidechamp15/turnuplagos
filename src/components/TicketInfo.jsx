import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TicketInfo = () => {
  const [ticketType, setTicketType] = useState("");
  const [categories, setCategories] = useState([
    { name: "", price: "", quantity: "" },
  ]);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      ticketType,
      categories: ticketType === "Paid" ? categories : [],
    };
    localStorage.setItem("ticketInfo", JSON.stringify(formData));
    navigate("/event-market");
    console.log("Saved to localStorage:", formData);
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([...categories, { name: "", price: "", quantity: "" }]);
  };

  const deleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="container-md mt-[48px] p-0 min-h-screen">
      <span className="text-[32px] text-white mb-6">
        Event <span className=" text-[#FFDE00] ">Information</span>
      </span>

      <form className="flex flex-col gap-2 my-3" onSubmit={handleFormSubmit}>
        <div className="flex xsm:flex-col gap-2 items-end  w-full ">
          <div className="flex flex-col gap-2  md:w-1/ w-full ">
            <label htmlFor="ticket_type" className="text-white">
              Ticket Type <span className="required">*</span>
            </label>
            <select
              name="ticket_type"
              id="ticket_type"
              onChange={(e) => setTicketType(e.target.value)}
              className="w-full p-2 rounded-lg !bg-transparent border  text-white"
            >
              <option value="" className="!bg-transparent text-black" disabled>
                Select Ticket Type
              </option>
              <option value="Free" className="!bg-transparent text-black">
                Free
              </option>
              <option value="Paid" className="text-black">
                Paid
              </option>
            </select>
          </div>
          {ticketType === "Paid" && (
            <button
              type="button"
              onClick={addCategory}
              className="btn btn-light w-full mt-2 py-2 h-fit"
            >
              Add Category
            </button>
          )}
        </div>
        {ticketType === "Paid" && (
          <div className="flex flex-col gap-2 p-2 d:w-1/2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex xsm:flex-col gap-2 rounded-lg relative "
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="absolute top-2 right-2 text-red-500 cursor-pointer"
                  onClick={() => deleteCategory(index)}
                />
                <div className="flex flex-col gap-2  md:w-1/2 ">
                  <label htmlFor="name" className="text-white">
                    Category <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    required
                    onChange={(e) =>
                      handleCategoryChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 rounded-lg bg-transparent border text-white"
                  />
                </div>
                <div className="flex flex-col gap-2  md:w-1/2 ">
                  <label htmlFor="price" className="text-white">
                    Price <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={category.price}
                    required
                    onChange={(e) =>
                      handleCategoryChange(index, "price", e.target.value)
                    }
                    className="w-full p-2 rounded-lg bg-transparent border text-white"
                  />
                </div>
                <div className="flex flex-col gap-2  md:w-1/2 ">
                  <label htmlFor="quantity" className="text-white">
                    Quantity to be sold <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={category.quantity}
                    required
                    onChange={(e) =>
                      handleCategoryChange(index, "quantity", e.target.value)
                    }
                    className="w-full p-2 rounded-lg bg-transparent border text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {ticketType === "Free" && (
          <div className="mt-4">
            <button className="btn btn-light w-fit" type="submit">
              Register Event
            </button>
          </div>
        )}
        {ticketType === "Paid" && (
          <div className="mt-4">
            <button type="submit" className="btn btn-light w-fit">
              Save and Continue
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TicketInfo;
