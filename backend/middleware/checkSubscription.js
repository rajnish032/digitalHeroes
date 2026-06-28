const Subscription = require("../models/subscription");

const checkSubscription = async (req, res, next) => {
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

    //check expiry
    if (subscription.expiryDate < new Date()) {
      subscription.status = "expired";
      await subscription.save();

      return res.status(403).json({
        success: false,
        message: "Your subscription has expired.",
      });
    }

    req.subscription = subscription;

    next();
  } catch (error) {
    console.error("Subscription middleware:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = checkSubscription;