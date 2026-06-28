const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    draw: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    matchTier: {
      type: String,
      enum: ["3-match", "4-match", "5-match"],
      required: true,
    },

    matchedNumbers: [
      {
        type: Number,
      },
    ],

    prizeAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
        "paid",
      ],
      default: "pending",
    },

    proof: {
      type: String,
      default: "",
    },

    paymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Winner", winnerSchema);