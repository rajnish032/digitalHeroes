const Score = require("../models/score");

// ===============================
// Add Score
// ===============================
exports.addScore = async (req, res) => {
  let { score, date } = req.body;

  // Required Fields
  if (score === undefined || !date) {
    return res.status(400).json({
      success: false,
      message: "Score and date are required",
    });
  }

  // Convert Score
  score = Number(score);

  // Validate Score
  if (Number.isNaN(score) || score < 1 || score > 45) {
    return res.status(400).json({
      success: false,
      message: "Score must be between 1 and 45",
    });
  }

  // Validate Date
  const scoreDate = new Date(date);

  if (isNaN(scoreDate.getTime())) {
    return res.status(400).json({
      success: false,
      message: "Invalid date",
    });
  }

  // Normalize Date
  scoreDate.setUTCHours(0, 0, 0, 0);

  // Prevent Future Date
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (scoreDate > today) {
    return res.status(400).json({
      success: false,
      message: "Future date is not allowed",
    });
  }

  // Duplicate Check
  const existingScore = await Score.findOne({
    user: req.user._id,
    date: scoreDate,
  });

  if (existingScore) {
    return res.status(400).json({
      success: false,
      message: "Score already exists for this date",
    });
  }

  // Latest 5 Scores Only
  const scores = await Score.find({
    user: req.user._id,
  }).sort({
    date: 1,
  });

  if (scores.length >= 5) {
    await Score.findByIdAndDelete(scores[0]._id);
  }

  // Create Score
  const newScore = await Score.create({
    user: req.user._id,
    score,
    date: scoreDate,
  });

  res.status(201).json({
    success: true,
    message: "Score added successfully",
    score: newScore,
  });
};

// ===============================
// Get Scores
// ===============================
exports.getScores = async (req, res) => {
  const scores = await Score.find({
    user: req.user._id,
  })
    .sort({
      date: -1,
    })
    .lean();

  res.status(200).json({
    success: true,
    count: scores.length,
    scores,
  });
};

// ===============================
// Update Score
// ===============================
exports.updateScore = async (req, res) => {
  let { score, date } = req.body;

  if (score === undefined) {
    return res.status(400).json({
      success: false,
      message: "Score is required",
    });
  }

  score = Number(score);

  if (Number.isNaN(score) || score < 1 || score > 45) {
    return res.status(400).json({
      success: false,
      message: "Score must be between 1 and 45",
    });
  }

  const updateData = {
    score,
  };

  if (date) {
    const scoreDate = new Date(date);

    if (isNaN(scoreDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    scoreDate.setUTCHours(0, 0, 0, 0);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (scoreDate > today) {
      return res.status(400).json({
        success: false,
        message: "Future date is not allowed",
      });
    }

    // Duplicate Date Check
    const duplicate = await Score.findOne({
      user: req.user._id,
      date: scoreDate,
      _id: {
        $ne: req.params.id,
      },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Another score already exists for this date",
      });
    }

    updateData.date = scoreDate;
  }

  const updatedScore = await Score.findOneAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedScore) {
    return res.status(404).json({
      success: false,
      message: "Score not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Score updated successfully",
    score: updatedScore,
  });
};

// ===============================
// Delete Score
// ===============================
exports.deleteScore = async (req, res) => {
  const deletedScore = await Score.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedScore) {
    return res.status(404).json({
      success: false,
      message: "Score not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Score deleted successfully",
  });
};
