import React, { useState } from "react";
import { updateTicket } from "../../utils/eventsFetched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faX } from "@fortawesome/free-solid-svg-icons";

const EditTicket = ({ ticketInfo, id, setEditTicketActive }) => {
  const [updatedTicket, setUpdatedTicket] = useState({
    categories: ticketInfo.categories || [],
  });

  // Handle changes to a specific category
  const handleCategoryChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCategories = [...updatedTicket.categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      [name]: value,
    };
    setUpdatedTicket({
      ...updatedTicket,
      categories: updatedCategories,
    });
  };

  // Handle submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateTicket(updatedTicket, id);

    if (response.success) {
      alert("Ticket updated successfully!");
    } else {
      alert(`Failed to update ticket: ${response.error}`);
    }
  };

  // Add a new category
  const handleAddCategory = () => {
    setUpdatedTicket({
      ...updatedTicket,
      categories: [
        ...updatedTicket.categories,
        { name: "", price: "", quantity: "" }, // New empty category
      ],
    });
  };

  // Delete a category
  const handleDeleteCategory = (index) => {
    const updatedCategories = updatedTicket.categories.filter(
      (_, idx) => idx !== index
    );
    setUpdatedTicket({
      ...updatedTicket,
      categories: updatedCategories,
    });
  };

  return (
    <div className=" w-full min-h-screen md:flex items-center justify-center  top-0 xsm:top-[78px] absolute left-0 p-4 custom-modal">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full gap-6 p-6 border border-gray-300 rounded-lg bg-white shadow-lg relative"
      >
        <div className="flex justify-between items-center">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => setEditTicketActive(false)}
            className=""
          />
          <span className="md:text-2xl font-semibold text-gray-700 text-center">
            Ticket Information
          </span>
          <span></span>
        </div>

        {updatedTicket.categories.map((category, index) => (
          <div
            key={index}
            className="flex xsm:flex-col gap-6 custom-layout  relative"
          >
            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor={`category-name-${index}`}
              >
                Category Name
              </label>
              <input
                type="text"
                required
                name="name"
                id={`category-name-${index}`}
                value={category.name || ""}
                onChange={(e) => handleCategoryChange(e, index)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter category name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor={`category-price-${index}`}
              >
                Price
              </label>
              <input
                type="number"
                required
                name="price"
                id={`category-price-${index}`}
                min="0"
                value={category.price || ""}
                onChange={(e) => handleCategoryChange(e, index)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter price"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-sm font-medium text-gray-600"
                htmlFor={`category-quantity-${index}`}
              >
                Quantity
              </label>
              <input
                type="number"
                required
                min="0"
                name="quantity"
                id={`category-quantity-${index}`}
                value={category.quantity || ""}
                onChange={(e) => handleCategoryChange(e, index)}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter quantity"
              />
            </div>

            {/* Button to delete category */}
            <button
              type="button"
              onClick={() => handleDeleteCategory(index)}
              className="text-red-600 mt-4 hover:text-red-800 focus:outline-none absolute top-0 right-0"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}

        {/* Button to add a new category */}
        <button
          type="button"
          onClick={handleAddCategory}
          className="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          Add Category
        </button>

        <button
          type="submit"
          className="py-3 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTicket;
