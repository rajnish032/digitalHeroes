const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const wrapAsync = require("../utils/wrapAsync");

const {
  getDashboard,
} = require("../controllers/dashboardController");
const checkSubscription = require("../middleware/checkSubscription");

router.get("/", authenticate,checkSubscription, wrapAsync(getDashboard));

module.exports = router;