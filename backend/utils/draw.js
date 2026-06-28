const createWinners = async (draw) => {

  // Remove previous winners
  await Winner.deleteMany({
    draw: draw._id,
  });

  // Active Users Only
  const users = await User.find()
    .populate("subscription");

  for (const user of users) {

    // Skip users without active subscription
    if (
      !user.subscription ||
      user.subscription.status !== "active"
    ) {
      continue;
    }

    // Latest 5 Scores
    const scores = await Score.find({
      user: user._id,
    })
      .sort({
        date: -1,
      })
      .limit(5);

    // Need exactly 5 scores
    if (scores.length < 5) continue;

    const userNumbers = scores.map(s => s.score);

    const matched = userNumbers.filter(number =>
      draw.winningNumbers.includes(number)
    );

    if (matched.length >= 3) {

      await Winner.create({

        draw: draw._id,

        user: user._id,

        matchedNumbers: matched.length,

        prizeAmount: 0,

        status: "pending",

      });

      user.totalDraws += 1;

      await user.save();

    }

  }

};


const distributePrize = async (draw) => {
  const winners = await Winner.find({
    draw: draw._id,
  });

  if (!winners.length) return;

  const match3 = winners.filter((w) => w.matchedNumbers === 3);
  const match4 = winners.filter((w) => w.matchedNumbers === 4);
  const match5 = winners.filter((w) => w.matchedNumbers === 5);

  const prize3 = draw.prizePool * 0.20;
  const prize4 = draw.prizePool * 0.30;
  const jackpot = draw.jackpot;

  // ---------- 3 Match Prize ----------
  if (match3.length > 0) {
    const amount = prize3 / match3.length;

    for (const winner of match3) {
      winner.prizeAmount = amount;
      await winner.save();
    }
  }

  // ---------- 4 Match Prize ----------
  if (match4.length > 0) {
    const amount = prize4 / match4.length;

    for (const winner of match4) {
      winner.prizeAmount = amount;
      await winner.save();
    }
  }

  // ---------- Jackpot ----------
  if (match5.length > 0) {
    const amount = jackpot / match5.length;

    for (const winner of match5) {
      winner.prizeAmount = amount;
      await winner.save();
    }
  } else {
    console.log("No Jackpot Winner");
    // Jackpot rollover logic can go here
  }
};