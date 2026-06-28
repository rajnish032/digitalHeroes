const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/authenticate");

const {
  addScore,
  getScores,
  updateScore,
  deleteScore,
} = require("../controllers/scoreController");
const checkSubscription = require("../middleware/checkSubscription");

// Add Score
router.post("/", authenticate,checkSubscription, wrapAsync(addScore));

// Get Scores
router.get("/", authenticate,checkSubscription, wrapAsync(getScores));

// Update Score
router.put("/:id", authenticate, checkSubscription, wrapAsync(updateScore));

// Delete Score
router.delete("/:id", authenticate, checkSubscription, wrapAsync(deleteScore));

module.exports = router;
