const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  plan: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "active", "expired", "cancelled"],
    default: "pending",
  },

  razorpayOrderId: {
    type: String,
    default: null,
  },

  razorpayPaymentId: {
    type: String,
    default: null,
  },

  startDate: {
    type: Date,
    default: null,
  },

  expiryDate: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);