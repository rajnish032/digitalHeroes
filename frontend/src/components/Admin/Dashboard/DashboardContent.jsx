import { useEffect, useState } from "react";
import axios from "axios";
import StatsCards from "./StatsCards";
import RecentUsers from "./RecentUsers";
import RecentDraws from "./RecentDraws";
import PendingWinners from "./PendingWinners";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashboardContent = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDashboard = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/dashboard`, {
        withCredentials: true,
      });
      if (data.success) setDashboard(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-7 h-7 border-2 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatsCards stats={dashboard?.stats} />

      <div className="grid xl:grid-cols-2 gap-4">
        <RecentUsers users={dashboard?.recentUsers} />
        <RecentDraws draw={dashboard?.latestDraw} />
      </div>

      <PendingWinners winners={dashboard?.pendingWinnerList} />
    </div>
  );
};

export default DashboardContent;
