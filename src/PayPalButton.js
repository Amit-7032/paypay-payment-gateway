import React, { useState } from "react";
import axios from "axios";

const PayPal = () => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        // "https://api-messaging.paypal.com/v1/messaging/threads",
        "https://api-m.sandbox.paypal.com/v2/checkout/orders",
        {
          //   content: {
          //     text: message,
          //   },
          intent: "CAPTURE",
          purchase_units: [
            {
              items: [
                {
                  name: "T-Shirt",
                  description: "Green XL",
                  quantity: "1",
                  unit_amount: {
                    currency_code: "USD",
                    value: "100.00",
                  },
                },
              ],
              amount: {
                currency_code: "USD",
                value: "100.00",
                breakdown: {
                  item_total: {
                    currency_code: "USD",
                    value: "100.00",
                  },
                },
              },
            },
          ],
          application_context: {
            return_url: "https://example.com/return",
            cancel_url: "https://example.com/cancel",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer A21AAIeoKK6lWIKnC4kfC095X3u-km6JmZYNasBwBNw_WvcSZ6gWfx8w2txB9jueu1WBeMx6U5kMN9E8Q1NXaIgQiXWC25_IQ`,
            Prefer: `return=representation`,
          },
        }
      );
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      {/* <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      /> */}
      <button className="button" onClick={sendMessage}>PayPal</button>
    </div>
  );
};

export default PayPal;
