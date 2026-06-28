const Subscription = require("../models/subscription");
const User = require("../models/user");

exports.createSubscription = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan. Must be 'monthly' or 'yearly'.",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const amount = plan === "monthly" ? 499 : 4999;

    const expiryDate = new Date();
    if (plan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    let subscription = await Subscription.findOne({ user: user._id });

    // Already active — block
    if (subscription?.status === "active") {
      return res.status(400).json({
        success: false,
        message: "You already have an active subscription.",
      });
    }

    // Reactivate lapsed/cancelled subscription
    if (subscription) {
      subscription.plan = plan;
      subscription.amount = amount;
      subscription.status = "active";
      subscription.startDate = new Date();
      subscription.expiryDate = expiryDate;
      subscription.paymentId = null;
      await subscription.save();

      // Re-link to user in case it was cleared on cancel
      if (!user.subscription) {
        user.subscription = subscription._id;
        await user.save();
      }
    } else {
      // First-time subscription
      subscription = await Subscription.create({
        user: user._id,
        plan,
        amount,
        status: "active",
        startDate: new Date(),
        expiryDate,
      });

      user.subscription = subscription._id;
      await user.save();
    }

    return res.status(201).json({
      success: true,
      message: "Subscription activated successfully.",
      subscription,
    });
  } catch (error) {
    console.error("createSubscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};


exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "active",
    });

    return res.status(200).json({
      success: true,
      subscription: subscription || null,
    });
  } catch (error) {
    console.error("getSubscription error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user._id,
      status: "active",
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found.",
      });
    }

    subscription.status = "cancelled";
    await subscription.save();

    // Clear subscription reference on user
    await User.findByIdAndUpdate(req.user._id, { subscription: null });

    return res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully.",
      subscription,
    });
  } catch (error) {
    console.error("cancelSubscription error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};