import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  // ============================
  // Get Subscription
  // ============================

  const getSubscription = async () => {
    try {
      const token = Cookies.get("magicalKey");

      if (!token) return;

      setLoading(true);

      const res = await axios.get(`${backendURL}/api/subscription`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setSubscription(res.data.subscription);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Create Razorpay Order
  // ============================

  const createOrder = async (plan) => {
    try {
      const token = Cookies.get("magicalKey");

      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/payment/create-order`,
        { plan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create order");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Verify Payment
  // ============================

  const verifyPayment = async (paymentData) => {
    try {
      const token = Cookies.get("magicalKey");

      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/payment/verify`,
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setSubscription(res.data.subscription);

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Payment verification failed",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Cancel Subscription
  // ============================

  const cancelSubscription = async () => {
    try {
      const token = Cookies.get("magicalKey");

      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/subscription/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setSubscription(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to cancel subscription",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const token = Cookies.get("magicalKey");

  //   if (token) {
  //     getSubscription();
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      getSubscription();
    } else {
      setSubscription(null);
    }
  }, [user]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,

        getSubscription,

        createOrder,

        verifyPayment,

        cancelSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
