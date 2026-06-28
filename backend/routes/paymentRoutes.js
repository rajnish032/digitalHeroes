const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// Create Razorpay Order
router.post("/create-order", authenticate, createOrder);

// Verify Payment
router.post("/verify", authenticate, verifyPayment);

module.exports = router;