const Winner = require("../models/winner");
const User = require("../models/user");

// Get Logged-in User Winnings
module.exports.getMyWinnings = async (req, res) => {
  const winnings = await Winner.find({
    user: req.user._id,
  })
    .populate("draw")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    winnings,
  });
};

// Upload Proof
module.exports.uploadProof = async (req, res) => {
  const { proof } = req.body;

  if (!proof) {
    return res.status(400).json({
      success: false,
      message: "Proof is required",
    });
  }

  const winner = await Winner.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!winner) {
    return res.status(404).json({
      success: false,
      message: "Winner record not found",
    });
  }

  winner.proof = proof;

  await winner.save();

  res.status(200).json({
    success: true,
    message: "Proof uploaded successfully",
    winner,
  });
};

// Get All Winners (Admin)
module.exports.getAllWinners = async (req, res) => {
  const winners = await Winner.find()
    .populate("user", "name email")
    .populate("draw")
    .sort({
      createdAt: -1,
    });

  res.status(200).json({
    success: true,
    winners,
  });
};

module.exports.updateWinnerStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!["approved", "rejected", "paid"].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status.",
      });
    }

    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found.",
      });
    }

    winner.paymentStatus = paymentStatus;

    if (paymentStatus === "paid") {
      winner.paymentDate = new Date();
    }

    await winner.save();

    return res.status(200).json({
      success: true,
      message: `Winner ${paymentStatus} successfully.`,
      winner,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

