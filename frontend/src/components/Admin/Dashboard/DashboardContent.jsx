import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import StatsCards from "./StatsCards";
import RecentUsers from "./RecentUsers";
import RecentDraws from "./RecentDraws";
import PendingWinners from "./PendingWinners";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DashboardContent = () => {
  const [dashboard, setDashboard] = useState(null);

  const getDashboard = async () => {
    try {
      const token = Cookies.get("magicalKey");

      const { data } = await axios.get(
        `${backendURL}/api/admin/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setDashboard(data);
      }
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

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