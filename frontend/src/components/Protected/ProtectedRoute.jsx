import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const {
    subscription,
    loading: subscriptionLoading,
  } = useSubscription();

  const navigate = useNavigate();

  useEffect(() => {
    // Not logged in
    if (!loading && !user) {
      const timer = setTimeout(() => {
        navigate("/auth/login", { replace: true });
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Admin
    if (!loading && user?.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    // Logged in but no subscription
    if (
      !loading &&
      !subscriptionLoading &&
      user &&
      user.role === "user" &&
      !subscription
    ) {
      navigate("/", { replace: true });
    }
  }, [loading, subscriptionLoading, user, subscription, navigate]);

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
            <FiAlertCircle className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Access Denied
          </h2>

          <p className="text-gray-400 mb-6">
            You need to be logged in to access this page.
          </p>

          <p className="text-gray-500 text-sm">
            Redirecting you to the login page...
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Logged in but no subscription
  if (!subscription) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;