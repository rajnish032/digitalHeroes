import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { FiAlertCircle, FiLoader } from "react-icons/fi";
import { useEffect } from "react";
import Sidebar from "../Admin/Sidebar";
import Header from "../Admin/Header";


const AdminRoute = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      const timer = setTimeout(() => navigate("/auth/login", { replace: true }), 3000);
      return () => clearTimeout(timer);
    }
    if (!loading && user && user.role !== "admin") {
      navigate("/dashboard", { replace: true });
    }
  }, [loading, user, navigate]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading…</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500/10 border border-red-500/20 rounded-xl mb-5">
            <FiAlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Access denied</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            You need to be logged in as an administrator to view this page.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <div className="w-3.5 h-3.5 border border-gray-600 border-t-gray-400 rounded-full animate-spin" />
            Redirecting to login…
          </div>
        </motion.div>
      </div>
    );
  }

  // Logged in but not admin
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-5">
            <FiAlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Unauthorized</h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Your account doesn't have permission to access the admin panel.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <div className="w-3.5 h-3.5 border border-gray-600 border-t-gray-400 rounded-full animate-spin" />
            Redirecting to your dashboard…
          </div>
        </motion.div>
      </div>
    );
  }

  // Admin — render layout
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Scrollable content area, offset by sidebar */}
      <div className="flex flex-col flex-1 ml-64 h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminRoute;