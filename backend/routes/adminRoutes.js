const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const authenticate = require("../middleware/authenticate");
const isAdmin = require("../middleware/isAdmin");

const {
  getDashboard,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getReports,
  getAllSubscriptions,
  updateSubscription,
  updateUserScore,
  deleteUserScore,
  runSimulation,
  analytics,
  publishDraw,
} = require("../controllers/adminController");


// ================================
// Dashboard
// ================================

router.get(
  "/dashboard",
  authenticate,
  isAdmin,
  wrapAsync(getDashboard)
);

// ================================
// Reports
// ================================

router.get(
  "/reports",
  authenticate,
  isAdmin,
  wrapAsync(getReports)
);

// ================================
// User Management
// ================================

// Get All Users
router.get(
  "/users",
  authenticate,
  isAdmin,
  wrapAsync(getAllUsers)
);

// Get User Details
router.get(
  "/users/:id",
  authenticate,
  isAdmin,
  wrapAsync(getUserById)
);

// Update User
router.put(
  "/users/:id",
  authenticate,
  isAdmin,
  wrapAsync(updateUser)
);

// Delete User
router.delete(
  "/users/:id",
  authenticate,
  isAdmin,
  wrapAsync(deleteUser)
);

// Subscription
router.get(
  "/subscriptions",
  authenticate,
  isAdmin,
  wrapAsync(getAllSubscriptions)
);

router.put(
  "/subscriptions/:id",
  authenticate,
  isAdmin,
  wrapAsync(updateSubscription)
);

// Scores
router.put(
  "/scores/:id",
  authenticate,
  isAdmin,
  wrapAsync(updateUserScore)
);

router.delete(
  "/scores/:id",
  authenticate,
  isAdmin,
  wrapAsync(deleteUserScore)
);

// Draw Simulation
router.post(
  "/draw/simulate",
  authenticate,
  isAdmin,
  wrapAsync(runSimulation)
);

// Publish Draw
router.put(
  "/draw/:id/publish",
  authenticate,
  isAdmin,
  wrapAsync(publishDraw)
);

// Analytics
router.get(
  "/analytics",
  authenticate,
  isAdmin,
  wrapAsync(analytics)
);

module.exports = router;