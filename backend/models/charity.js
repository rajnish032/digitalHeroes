const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    minimumContribution: {
      type: Number,
      default: 10,
      min: 10,
      max: 100,
    },

    totalDonation: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Charity", charitySchema);