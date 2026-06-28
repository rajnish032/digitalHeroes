const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    month: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    winningNumbers: [
      {
        type: Number,
        required: true,
      },
    ],

    prizePool: {
      type: Number,
      default: 0,
    },

    jackpot: {
      type: Number,
      default: 0,
    },

    jackpotRolledOver: {
      type: Boolean,
      default: false,
    },

    rolledOverAmount: {
      type: Number,
      default: 0,
    },

    winners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Winner",
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    drawDate: {
      type: Date,
      default: Date.now,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Draw", drawSchema);