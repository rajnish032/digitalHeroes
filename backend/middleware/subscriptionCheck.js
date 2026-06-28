const Subscription = require("../models/subscription");

const subscriptionCheck = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "active",
    });

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: "Active subscription required.",
      });
    }

    // Check expiry
    if (
  subscription.status !== "active" ||
  subscription.expiryDate < new Date()
) {
  subscription.status = "expired";
  await subscription.save();

  return res.status(403).json({
    success: false,
    message: "Subscription expired",
  });
}

    req.subscription = subscription;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = subscriptionCheck;