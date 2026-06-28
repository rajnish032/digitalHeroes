const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},

subscription: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Subscription",
  default: null,
},

selectedCharity: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Charity",
  default: null,
},

charityPercentage: {
  type: Number,
  default: 10,
},

totalWinnings: {
  type: Number,
  default: 0,
},

totalDraws: {
  type: Number,
  default: 0,
},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
