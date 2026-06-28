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
const checkSubscription = require("../middleware/checkSubscription");


// Public/User
router.get("/", authenticate,checkSubscription, wrapAsync(getAllCharities));

router.get("/:id", authenticate,checkSubscription, wrapAsync(getCharityById));

router.put("/select-charity/:id", authenticate,checkSubscription, wrapAsync(selectCharity));

// Admin
router.post("/", authenticate, isAdmin, wrapAsync(createCharity));

router.put("/:id", authenticate, isAdmin, wrapAsync(updateCharity));

router.delete("/:id", authenticate, isAdmin, wrapAsync(deleteCharity));

module.exports = router;
