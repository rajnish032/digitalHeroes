const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/authenticate");

const {
  createSubscription,
  getSubscription,
  cancelSubscription,
} = require("../controllers/subscription");

// Create Subscription
router.post("/create", authenticate, wrapAsync(createSubscription));

// Get Logged In User Subscription
router.get("/", authenticate, wrapAsync(getSubscription));

// Cancel Subscription
router.put("/cancel", authenticate, wrapAsync(cancelSubscription));



module.exports = router;