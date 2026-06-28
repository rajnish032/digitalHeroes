import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";

import SubscriptionBanner from "./SubscriptionBanner";
import StatsCards from "./StatsCards";
import LastFiveScores from "./LastFiveScores";
import MyCharity from "./MyCharity";
import DrawParticipation from "./DrawParticipation";
import WinningsOverview from "./WinningsOverview";

const DashboardContent = () => {
  const { user } = useAuth();
  const { dashboard, getDashboard } = useDashboard();
  useEffect(() => {
    getDashboard();
  }, []);

  const subscription = dashboard?.subscription;

  return (
    <div className="space-y-4 p-6">
      {/* Greeting */}
      <div className="mb-2">
        <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-0.5">
          Dashboard
        </p>

        <h1 className="text-xl font-semibold text-gray-900">
          Welcome back
          {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
      </div>

      <SubscriptionBanner subscription={subscription} />

      <StatsCards stats={dashboard?.stats} />

      <div className="grid xl:grid-cols-12 gap-4">
        <div className="xl:col-span-7">
          <LastFiveScores scores={dashboard?.latestScores} />
        </div>

        <div className="xl:col-span-5 space-y-4">
          <MyCharity
            charity={dashboard?.selectedCharity}
            donation={dashboard?.stats?.donationAmount}
          />

          <DrawParticipation draws={dashboard?.drawHistory || []} />
        </div>
      </div>

      <WinningsOverview winnings={dashboard?.recentWinnings} />
    </div>
  );
};

export default DashboardContent;
