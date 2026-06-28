const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");
const wrapAsync = require("../utils/wrapAsync");

const {
  getMyWinnings,
  uploadProof,
  getAllWinners,
  updateWinnerStatus,
} = require("../controllers/winnerController");
const checkSubscription = require("../middleware/checkSubscription");

// ================= User Routes =================

router.get(
  "/my",
  authenticate,
  checkSubscription,
  wrapAsync(getMyWinnings)
);

router.put(
  "/:id/upload-proof",
  authenticate,
  checkSubscription,
  wrapAsync(uploadProof)
);

// ================= Admin Routes =================

router.get(
  "/admin",
  authenticate,
  isAdmin,
  wrapAsync(getAllWinners)
);

router.put(
  "/admin/:id/status",
  authenticate,
  isAdmin,
  wrapAsync(updateWinnerStatus)
);

module.exports = router;
