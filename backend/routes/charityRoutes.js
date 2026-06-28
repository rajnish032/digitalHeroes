const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");
const {
  createCharity,
  getAllCharities,
  getCharityById,
  updateCharity,
  deleteCharity,
  selectCharity,
} = require("../controllers/charity");
const subscriptionCheck = require("../middleware/subscriptionCheck");

// Public/User
router.get("/", authenticate,subscriptionCheck, wrapAsync(getAllCharities));

router.get("/:id", authenticate,subscriptionCheck, wrapAsync(getCharityById));

router.put("/select-charity/:id", authenticate,subscriptionCheck, wrapAsync(selectCharity));

// Admin
router.post("/", authenticate, isAdmin, wrapAsync(createCharity));

router.put("/:id", authenticate, isAdmin, wrapAsync(updateCharity));

router.delete("/:id", authenticate, isAdmin, wrapAsync(deleteCharity));

module.exports = router;
