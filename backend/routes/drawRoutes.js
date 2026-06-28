const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");
const wrapAsync = require("../utils/wrapAsync");

const {
  runDraw,
  getLatestDraw,
  getAllDraws,
  publishDraw,
  deleteDraw,
  getAllAdminDraws,
  getAdminLatestDraw,
} = require("../controllers/drawController");
const checkSubscription = require("../middleware/checkSubscription");

// Admin Only
router.post("/admin/run", authenticate, isAdmin, wrapAsync(runDraw));
router.put("/admin/:id/publish", authenticate, isAdmin, wrapAsync(publishDraw));
router.delete("/admin/:id", authenticate, isAdmin, wrapAsync(deleteDraw));
router.get("/admin", authenticate, wrapAsync(getAllAdminDraws));
router.get("/admin/latest", authenticate, wrapAsync(getAdminLatestDraw));

// Logged In Users
router.get("/", authenticate,checkSubscription, wrapAsync(getAllDraws));
router.get("/latest", authenticate,checkSubscription, wrapAsync(getLatestDraw));

module.exports = router;