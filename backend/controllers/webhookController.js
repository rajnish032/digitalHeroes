const crypto = require("crypto");

const Subscription = require("../models/subscription");
const User = require("../models/user");

exports.razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
      .update(req.body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    const payload = JSON.parse(req.body);

    if (payload.event !== "payment.captured") {
      return res.status(200).json({
        success: true,
        message: "Event ignored",
      });
    }

    const payment = payload.payload.payment.entity;

    const orderId = payment.order_id;
    const paymentId = payment.id;

    const subscription = await Subscription.findOne({
      razorpayOrderId: orderId,
    });

    if (!subscription) {
      return res.status(200).json({
        success: true,
        message: "Subscription not found",
      });
    }

    if (subscription.status === "active") {
      return res.status(200).json({
        success: true,
        message: "Already processed",
      });
    }

    subscription.status = "active";
    subscription.razorpayPaymentId = paymentId;
    subscription.paymentId = paymentId;
    subscription.startDate = new Date();

    const expiryDate = new Date();

    if (subscription.plan === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    subscription.expiryDate = expiryDate;

    await subscription.save();

    await User.findByIdAndUpdate(subscription.user, {
      subscription: subscription._id,
    });

    return res.status(200).json({
      success: true,
      message: "Subscription activated successfully",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook Error",
    });
  }
};
