const crypto = require("crypto");

const razorpay = require("../config/razorpay");

const Subscription = require("../models/subscription");
const User = require("../models/user");


// Create Razorpay Order

exports.createOrder = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const activeSubscription = await Subscription.findOne({
      user: user._id,
      status: "active",
    });

    if (activeSubscription) {
      return res.status(400).json({
        success: false,
        message: "You already have an active subscription.",
      });
    }

    const amount = plan === "monthly" ? 499 : 4999;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `sub_${Date.now()}`,
    });

    const subscription = await Subscription.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        plan,
        amount,
        status: "pending",
        razorpayOrderId: order.id,
        razorpayPaymentId: null,
        startDate: null,
        expiryDate: null,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    return res.status(201).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

// =========================================
// Verify Razorpay Payment
// =========================================

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const subscription = await Subscription.findOne({
      razorpayOrderId: razorpay_order_id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    if (subscription.status === "active") {
      return res.status(200).json({
        success: true,
        message: "Subscription already active",
        subscription,
      });
    }

    subscription.status = "active";
    subscription.razorpayPaymentId = razorpay_payment_id;
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
      message: "Payment verified successfully",
      subscription,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
