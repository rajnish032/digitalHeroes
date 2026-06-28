import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboard = async () => {
    try {
      const token = Cookies.get("magicalKey");

      if (!token) {
        return;
      }
      setLoading(true);
      const res = await axios.get(`${backendURL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setDashboard(res.data.dashboard);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("magicalKey");

    if (token) {
      getDashboard();
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        getDashboard,
        refreshDashboard: getDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
