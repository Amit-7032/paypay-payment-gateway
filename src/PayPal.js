import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js";
import axios from "axios"; // Import Axios for making HTTP requests

const PayPalButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const initialOptions = {
    "client-id":
    process.env.CLIENT_ID,
  };

  const buttonStyles = {
    layout: "vertical", // horizontal | vertical
    color: "gold", // gold | blue | silver | black
    shape: "rect", // pill | rect
    label: "pay", // checkout | paypal | buynow | pay | installment
    height: 40, // 40 | 25
    // width: 200,
    tagline: false, // true | false
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "1", // Change this to the desired amount
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    console.log("Transaction Approved");
    try {
      const order = await actions.order.capture();
      console.log("Payment successful:", order);
      sendPaymentDetailsToServer(order);
    } catch (error) {
      console.error("Capture failed:", error);
    }
  };

  const onError = (err) => {
    console.error("Error Occurred:", err);
    // Handle errors
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const sendPaymentDetailsToServer = async (paymentDetails) => {
    const API_ENDPOINT = "http://localhost:5000/payment-details";
    console.log('paymentDetails', paymentDetails);
    try {
      const response = await axios.post(API_ENDPOINT, {
        amount: paymentDetails.purchase_units[0].amount.value,
        payerName: paymentDetails.payer.name.given_name,
        // Add more details as needed
      });
      console.log("Payment details sent to server:", response.data);
      // Handle response from server
    } catch (error) {
      console.error("Error sending payment details to server:", error);
      // Handle error
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <button onClick={handleClick}>Donate</button>
      {isOpen && (
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={buttonStyles}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
            // fundingSource={FUNDING.PAYPAL}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default PayPalButton;
