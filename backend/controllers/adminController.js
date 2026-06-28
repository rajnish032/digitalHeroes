const User = require("../models/user");
const Subscription = require("../models/subscription");
const Charity = require("../models/charity");
const Score = require("../models/score");
const Draw = require("../models/draw");
const Winner = require("../models/winner");

module.exports.getDashboard = async (req, res) => {
  // Dashboard Stats
  const totalUsers = await User.countDocuments();

  const activeSubscriptions = await Subscription.countDocuments({
    status: "active",
  });
  const totalCharities = await Charity.countDocuments();
  const pendingWinners = await Winner.countDocuments({
    status: "pending",
  });
  const paidWinners = await Winner.countDocuments({
    status: "paid",
  });
  // Prize Pool
  const prizePool = await Draw.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$prizePool",
        },
      },
    },
  ]);

  const currentPrizePool = prizePool.length > 0 ? prizePool[0].total : 0;

  // Recent Users
  const recentUsers = await User.find()
    .select("name email role createdAt")
    .sort({
      createdAt: -1,
    })
    .limit(5);

  // Latest Draw
  const latestDraw = await Draw.findOne()
    .sort({
      createdAt: -1,
    })
    .lean();

  if (latestDraw) {
    latestDraw.totalWinners = await Winner.countDocuments({
      draw: latestDraw._id,
    });
  }

  // Pending Winners
  const pendingWinnerList = await Winner.find({
    status: "pending",
  })
    .populate("user", "name")
    .sort({
      createdAt: -1,
    })
    .limit(5);

  res.status(200).json({
    success: true,

    stats: {
      totalUsers,
      activeSubscriptions,
      currentPrizePool,
      pendingWinners,
      paidWinners,
      totalCharities,
    },

    recentUsers,

    latestDraw,

    pendingWinnerList,
  });
};

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find()
    .populate("subscription")
    .populate("selectedCharity")
    .sort({
      createdAt: -1,
    });

  res.json({
    success: true,
    users,
  });
};
module.exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate("subscription")
    .populate("selectedCharity");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const scores = await Score.find({
    user: user._id,
  });

  const winnings = await Winner.find({
    user: user._id,
  });

  res.json({
    success: true,
    user,
    scores,
    winnings,
  });
};

module.exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

module.exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  await Subscription.deleteMany({
    user: user._id,
  });

  await Score.deleteMany({
    user: user._id,
  });

  await Winner.deleteMany({
    user: user._id,
  });

  await user.deleteOne();

  res.json({
    success: true,
    message: "User deleted successfully",
  });
};

module.exports.getReports = async (req, res) => {
  const users = await User.countDocuments();

  const subscriptions = await Subscription.countDocuments();

  const activeSubscriptions = await Subscription.countDocuments({
    status: "active",
  });

  const draws = await Draw.countDocuments();

  const winners = await Winner.countDocuments();

  const totalRevenue = await Subscription.aggregate([
    {
      $group: {
        _id: null,
        revenue: {
          $sum: "$amount",
        },
      },
    },
  ]);

  res.json({
    success: true,

    reports: {
      users,

      subscriptions,

      activeSubscriptions,

      draws,

      winners,

      revenue: totalRevenue.length > 0 ? totalRevenue[0].revenue : 0,
    },
  });
};

module.exports.getAllSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    subscriptions,
  });
};

module.exports.updateSubscription = async (req, res) => {
  const subscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!subscription) {
    return res.status(404).json({
      success: false,
      message: "Subscription not found",
    });
  }

  res.json({
    success: true,
    message: "Subscription updated successfully",
    subscription,
  });
};

module.exports.updateUserScore = async (req, res) => {
  const score = await Score.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!score) {
    return res.status(404).json({
      success: false,
      message: "Score not found",
    });
  }

  res.json({
    success: true,
    message: "Score updated successfully",
    score,
  });
};

module.exports.deleteUserScore = async (req, res) => {
  const score = await Score.findById(req.params.id);

  if (!score) {
    return res.status(404).json({
      success: false,
      message: "Score not found",
    });
  }

  await score.deleteOne();

  res.json({
    success: true,
    message: "Score deleted successfully",
  });
};

module.exports.runSimulation = async (req, res) => {
  const numbers = new Set();

  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  res.json({
    success: true,
    simulation: [...numbers].sort((a, b) => a - b),
  });
};

module.exports.publishDraw = async (req, res) => {
  const draw = await Draw.findById(req.params.id);

  if (!draw) {
    return res.status(404).json({
      success: false,
      message: "Draw not found",
    });
  }

  draw.status = "published";

  await draw.save();

  res.json({
    success: true,
    message: "Draw published successfully",
    draw,
  });
};

module.exports.analytics = async (req, res) => {
  const activeUsers = await Subscription.countDocuments({
    status: "active",
  });

  const totalPrizePool = await Draw.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$prizePool",
        },
      },
    },
  ]);

  const totalDonations = await User.aggregate([
    {
      $group: {
        _id: null,
        total: {
          $sum: "$charityPercentage",
        },
      },
    },
  ]);

  res.json({
    success: true,
    analytics: {
      activeUsers,
      totalPrizePool: totalPrizePool.length > 0 ? totalPrizePool[0].total : 0,
      totalDonations: totalDonations.length > 0 ? totalDonations[0].total : 0,
    },
  });
};
