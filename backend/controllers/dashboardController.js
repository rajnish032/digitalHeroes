const User = require("../models/user");
const Score = require("../models/score");
const Draw = require("../models/draw");
const Winner = require("../models/winner");

module.exports.getDashboard = async (req, res) => {
  try {
    // User
    const user = await User.findById(req.user._id)
      .populate("subscription")
      .populate("selectedCharity");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Latest 5 Scores
    const latestScores = await Score.find({
      user: user._id,
    })
      .sort({ date: -1 })
      .limit(5);

    // Average Score
    const averageScore =
      latestScores.length > 0
        ? Math.round(
            latestScores.reduce((sum, item) => sum + item.score, 0) /
              latestScores.length,
          )
        : 0;

    // Latest Published Draw
    const latestDraw = await Draw.findOne({
      status: "published",
    }).sort({
      drawDate: -1,
    });

    // Recent Winnings
    const recentWinnings = await Winner.find({
      user: user._id,
    })
      .populate("draw")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Total Winnings
    const totalWinnings = recentWinnings.reduce(
      (sum, item) => sum + (item.prizeAmount || 0),
      0,
    );

    // Total Prize Count
    const totalWins = recentWinnings.length;

    // Donation Amount
    let donationAmount = 0;

    if (user.subscription) {
      donationAmount = Number((user.subscription.amount * 0.1).toFixed(2));
    }

    // Days Left
    let daysLeft = 0;

    if (
      user.subscription &&
      user.subscription.expiryDate &&
      user.subscription.status === "active"
    ) {
      const diff = new Date(user.subscription.expiryDate) - new Date();

      daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    }

    // Next Draw Countdown
    let nextDraw = null;

    if (latestDraw) {
      const diff = new Date(latestDraw.drawDate) - new Date();

      nextDraw = {
        ...latestDraw.toObject(),
        daysRemaining: Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0),
      };
    }

    // Draw History
    const drawHistory = await Draw.find({
      status: "published",
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const formattedDrawHistory = await Promise.all(
      drawHistory.map(async (draw) => {
        const winner = await Winner.findOne({
          draw: draw._id,
          user: user._id,
        });

        let status = "No Match";

        if (winner) {
          status = `${winner.matchCount}-Match Win`;
        }

        return {
          _id: draw._id,
          month: `${draw.month} ${draw.year}`,
          status,
        };
      }),
    );

    return res.status(200).json({
      success: true,

      dashboard: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },

        subscription: user.subscription
          ? {
              plan: user.subscription.plan,
              status: user.subscription.status,
              amount: user.subscription.amount,
              startDate: user.subscription.startDate,
              expiryDate: user.subscription.expiryDate,
              daysLeft,
            }
          : null,

        stats: {
          averageScore,
          drawsEntered: user.totalDraws || 0,
          totalWon: totalWinnings,
          totalWins,
          donationAmount,
        },

        latestScores,

        selectedCharity: user.selectedCharity,

        latestDraw: nextDraw,

        drawHistory: formattedDrawHistory,

        recentWinnings,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
