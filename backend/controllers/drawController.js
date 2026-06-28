const Draw = require("../models/draw");
const Score = require("../models/score");
const User = require("../models/user");
const Winner = require("../models/winner");
const Subscription = require("../models/subscription");

function generateRandomNumbers() {
  const numbers = new Set();
  while (numbers.size < 5) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...numbers].sort((a, b) => a - b);
}

// Determine match tier for a user's scores vs winning numbers
function getMatchTier(userScores, winningNumbers) {
  const winSet = new Set(winningNumbers);
  const matches = userScores.filter((s) => winSet.has(s)).length;
  if (matches === 5) return { tier: "5-match", poolShare: 0.4, matches };
  if (matches === 4) return { tier: "4-match", poolShare: 0.35, matches };
  if (matches === 3) return { tier: "3-match", poolShare: 0.25, matches };
  return null;
}

// Create winner records and distribute prizes
async function createWinnersAndDistribute(draw) {
  // Active subscribers only
  const activeSubscriptions = await Subscription.find({
    status: "active",
  }).select("user");

  const activeUserIds = activeSubscriptions.map((s) => s.user);

  const winners = [];

  const tierBuckets = {
    "5-match": [],
    "4-match": [],
    "3-match": [],
  };

  // Process every active user
  for (const userId of activeUserIds) {
    // Latest 5 submitted scores
    const scores = await Score.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    if (scores.length < 5) continue;

    const userScores = scores.map((s) => s.score);

    const result = getMatchTier(userScores, draw.winningNumbers);

    if (!result) continue;

    tierBuckets[result.tier].push({
      userId,
      matchedNumbers: userScores.filter((n) =>
        draw.winningNumbers.includes(n)
      ),
    });
  }

  // Prize Distribution
  const tierShares = {
    "5-match": 0.4,
    "4-match": 0.35,
    "3-match": 0.25,
  };

  for (const tier of Object.keys(tierBuckets)) {
    const participants = tierBuckets[tier];

    if (!participants.length) continue;

    const tierPool = Math.floor(draw.prizePool * tierShares[tier]);

    const prizePerWinner = Math.floor(
      tierPool / participants.length
    );

    for (const participant of participants) {
      const winner = await Winner.create({
        draw: draw._id,
        user: participant.userId,
        matchTier: tier,
        matchedNumbers: participant.matchedNumbers,
        prizeAmount: prizePerWinner,
        paymentStatus: "pending",
      });

      winners.push(winner);
    }
  }

  // Jackpot rollover
  if (tierBuckets["5-match"].length === 0) {
    draw.jackpotRolledOver = true;
    draw.rolledOverAmount = Math.floor(draw.prizePool * 0.4);
  } else {
    draw.jackpotRolledOver = false;
    draw.rolledOverAmount = 0;
  }

  draw.winners = winners.map((w) => w._id);

  await draw.save();

  return winners;
}

module.exports.runDraw = async (req, res) => {
  try {
    let { prizePool = 0, drawDate } = req.body;

    prizePool = Number(prizePool);

    if (!Number.isFinite(prizePool) || prizePool <= 0) {
      return res.status(400).json({
        success: false,
        message: "Prize pool must be greater than 0.",
      });
    }

    const drawDateObj = drawDate ? new Date(drawDate) : new Date();

    if (isNaN(drawDateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid draw date.",
      });
    }

    drawDateObj.setHours(0, 0, 0, 0);

    const month = drawDateObj.getMonth() + 1;
    const year = drawDateObj.getFullYear();

    const nextDay = new Date(drawDateObj);
    nextDay.setDate(nextDay.getDate() + 1);

    const existingDraw = await Draw.findOne({
      drawDate: {
        $gte: drawDateObj,
        $lt: nextDay,
      },
    });

    if (existingDraw) {
      return res.status(400).json({
        success: false,
        message: "A draw already exists for this date.",
      });
    }

    // Generate Winning Numbers
    //const winningNumbers = generateRandomNumbers();

    // Generate Winning Numbers (Testing)
const winningNumbers = [8, 15, 25, 10, 30];

    // Create Draw
    const draw = await Draw.create({
      month,
      year,
      drawDate: drawDateObj,
      prizePool,
      jackpot: Math.round(prizePool * 0.4),
      winningNumbers,
      status: "draft",
      jackpotRolledOver: false,
      rolledOverAmount: 0,
      winners: [],
    });

    // Generate Winners
    const winners = await createWinnersAndDistribute(draw);

    draw.winners = winners.map((winner) => winner._id);

    await draw.save();

    return res.status(201).json({
      success: true,
      message: "Draw created successfully.",
      draw,
      summary: {
        totalWinners: winners.length,
        prizePool: draw.prizePool,
        jackpot: draw.jackpot,
        winningNumbers: draw.winningNumbers,
        jackpotRolledOver: draw.jackpotRolledOver,
        rolledOverAmount: draw.rolledOverAmount,
      },
      winners,
    });
  } catch (error) {
    console.error("Run Draw Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Get Latest user Draw
module.exports.getLatestDraw = async (req, res) => {
  try {
    const draw = await Draw.findOne({
      status: "published",
    })
      .sort({ drawDate: -1 })
      .populate({
        path: "winners",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!draw) {
      return res.status(200).json({
        success: true,
        draw: null,
        message: "No published draw found.",
      });
    }

    return res.status(200).json({
      success: true,
      draw,
    });
  } catch (error) {
    console.error("getLatestDraw error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Get All  user Draws
module.exports.getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find({
      status: "published",
    }).sort({
      drawDate: -1,
    });

    return res.status(200).json({
      success: true,
      draws,
    });
  } catch (error) {
    console.error("getAllDraws error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};


// get all admin draws
module.exports.getAllAdminDraws = async (req, res) => {
  try {
    const draws = await Draw.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, draws });
  } catch (error) {
    console.error("getAllDraws error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

// get all admin latest draw
module.exports.getAdminLatestDraw = async (req, res) => {
  try {
    const draw = await Draw.findOne()
      .sort({ createdAt: -1 })
      .populate("winners");
    if (!draw) {
      return res
        .status(200)
        .json({
          success: true,
          draw: null,
          message: "No draw has been run yet.",
        });
    }
    return res.status(200).json({ success: true, draw });
  } catch (error) {
    console.error("getLatestDraw error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports.publishDraw = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);

    if (!draw) {
      return res.status(404).json({
        success: false,
        message: "Draw not found.",
      });
    }

    if (draw.status === "published") {
      return res.status(400).json({
        success: false,
        message: "Draw is already published.",
      });
    }

    // Prevent duplicate winner creation
    const existingWinners = await Winner.find({
      draw: draw._id,
    });

    let winners = existingWinners;

    if (existingWinners.length === 0) {
      winners = await createWinnersAndDistribute(draw);
    }

    draw.winners = winners.map((winner) => winner._id);
    draw.status = "published";
    draw.publishedAt = new Date();

    await draw.save();

    return res.status(200).json({
      success: true,
      message: "Draw published successfully.",
      draw,
      winners,
      summary: {
        totalWinners: winners.length,
        prizePool: draw.prizePool,
        jackpot: draw.jackpot,
        winningNumbers: draw.winningNumbers,
        jackpotRolledOver: draw.jackpotRolledOver,
        rolledOverAmount: draw.rolledOverAmount,
      },
    });
  } catch (error) {
    console.error("publishDraw error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// Delete Draw
module.exports.deleteDraw = async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);

    if (!draw) {
      return res.status(404).json({
        success: false,
        message: "Draw not found.",
      });
    }

    if (draw.status === "published") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete a published draw.",
      });
    }

    // Also remove associated winner records
    await Winner.deleteMany({ draw: draw._id });
    await draw.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Draw and associated winners deleted.",
    });
  } catch (error) {
    console.error("deleteDraw error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};
