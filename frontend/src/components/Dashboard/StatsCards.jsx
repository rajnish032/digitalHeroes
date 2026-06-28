import { Target, BarChart3, Heart, Trophy } from "lucide-react";

const StatsCards = ({ stats }) => {
  const cells = [
    {
      label: "Avg score",
      value: stats?.averageScore ?? 0,
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Draws entered",
      value: stats?.drawsEntered ?? 0,
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      label: "Charity donated",
      value: `₹${stats?.donationAmount ?? 0}`,
      icon: Heart,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      label: "Total won",
      value: `₹${stats?.totalWon ?? 0}`,
      icon: Trophy,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="grid grid-cols-2 xl:grid-cols-4 divide-x divide-y xl:divide-y-0 divide-gray-100">
        {cells.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="px-5 py-4 flex items-center justify-between gap-3"
          >
            <div>
              <p className="text-[10px] font-medium uppercase tracking-widest text-gray-400">
                {label}
              </p>
              <p className="mt-1.5 text-xl font-semibold text-gray-900 tracking-tight">
                {value}
              </p>
            </div>
            <div
              className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon size={16} className={color} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
