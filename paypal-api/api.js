const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors middleware
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Define your API endpoint
app.post("/payment-details", (req, res) => {
  // Handle the payment details received from the client
  const { amount, payerName } = req.body;

  // Here you can process the payment details as needed
  // For this example, we'll simply log them
  console.log("Received payment details:");
  console.log("Amount:", amount);
  console.log("Payer Name:", payerName);

  // Send a response back to the client
  res.send("Payment details received successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
