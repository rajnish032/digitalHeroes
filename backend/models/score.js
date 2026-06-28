const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 1,
      max: 45,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Remove time portion
scoreSchema.pre("save", function (next) {
  this.date = new Date(this.date);
  this.date.setUTCHours(0, 0, 0, 0);
  next();
});

// One score per user per day
scoreSchema.index(
  {
    user: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Score", scoreSchema);