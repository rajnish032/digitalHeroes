import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../contexts/AuthContext";
import { useSubscription } from "../contexts/SubscriptionContext";

export const useRazorpay = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    subscription,
    createOrder,
    verifyPayment,
    getSubscription,
  } = useSubscription();

  const openCheckout = async (plan) => {
    if (!user) {
      toast.info("Please login to continue.");
      navigate("/auth/login");
      return;
    }

    if (subscription?.status === "active") {
      toast.info("You already have an active subscription.");
      navigate("/subscription");
      return;
    }

    try {
      const { order, key } = await createOrder(plan);

      if (!window.Razorpay) {
        toast.error("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key,

        amount: order.amount,

        currency: order.currency,

        order_id: order.id,

        name: "Golf Draw",

        description: `${plan} Subscription`,

        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone || "",
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
          },
        },

        theme: {
          color: "#10b981",
        },

        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await getSubscription();

            toast.success("Subscription activated.");

            navigate("/dashboard");

          } catch (err) {
            toast.error("Payment verification failed.");
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        toast.error(
          response.error.description || "Payment failed."
        );
      });

      razorpay.open();

    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Something went wrong."
      );
    }
  };

  return {
    openCheckout,
  };
};