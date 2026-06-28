const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const wrapAsync = require("../utils/wrapAsync");

const {
  getDashboard,
} = require("../controllers/dashboardController");
const subscriptionCheck = require("../middleware/subscriptionCheck");

router.get("/", authenticate,subscriptionCheck, wrapAsync(getDashboard));

module.exports = router;