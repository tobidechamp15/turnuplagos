import React from "react";

const PaystackPayment = () => {
  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: "pk_live_a4273eeccb94ab1c875c4ff082b351e36ae33122", // Replace with your Paystack public key
      email: "tobidechamp15@gmail.com", // Customer's email
      amount: 10000, // Amount in kobo (₦100 = 10000)
      currency: "NGN",
      ref: `ref-${Math.floor(Math.random() * 1000000000)}`, // Unique transaction reference
      callback: function (response) {
        // This function runs after the payment is successful
        alert(
          `Payment successful! Transaction reference: ${response.reference}`
        );
        // Optionally, send the reference to your backend for verification
      },
      onClose: function () {
        // This function runs if the user closes the payment modal
        alert("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe(); // Open the Paystack payment modal
  };

  return (
    <button
      onClick={payWithPaystack}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Pay Now
    </button>
  );
};

export default PaystackPayment;
