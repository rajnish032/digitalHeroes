const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/authenticate");
const subscriptionCheck = require("../middleware/subscriptionCheck");

const {
  addScore,
  getScores,
  updateScore,
  deleteScore,
} = require("../controllers/scoreController");

// Add Score
router.post("/", authenticate, subscriptionCheck, wrapAsync(addScore));

// Get Scores
router.get("/", authenticate,subscriptionCheck, wrapAsync(getScores));

// Update Score
router.put("/:id", authenticate, subscriptionCheck, wrapAsync(updateScore));

// Delete Score
router.delete("/:id", authenticate, subscriptionCheck, wrapAsync(deleteScore));

module.exports = router;
