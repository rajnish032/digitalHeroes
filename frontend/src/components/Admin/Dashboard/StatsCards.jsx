import { Users, CreditCard, Trophy, Heart, Wallet, Clock } from "lucide-react";

const cards = [
  { title: "Total users", key: "totalUsers", icon: Users, color: "blue" },
  {
    title: "Active subscriptions",
    key: "activeSubscriptions",
    icon: CreditCard,
    color: "emerald",
  },
  {
    title: "Prize pool",
    key: "currentPrizePool",
    icon: Wallet,
    color: "amber",
    currency: true,
  },
  {
    title: "Pending winners",
    key: "pendingWinners",
    icon: Clock,
    color: "orange",
  },
  { title: "Paid winners", key: "paidWinners", icon: Trophy, color: "purple" },
  {
    title: "Total charities",
    key: "totalCharities",
    icon: Heart,
    color: "pink",
  },
];

const palette = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "text-blue-500",
    num: "text-blue-700",
  },
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    icon: "text-emerald-500",
    num: "text-emerald-700",
  },
  amber: {
    bg: "bg-amber-50",
    border: "border-amber-100",
    icon: "text-amber-500",
    num: "text-amber-700",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-100",
    icon: "text-orange-500",
    num: "text-orange-700",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-100",
    icon: "text-purple-500",
    num: "text-purple-700",
  },
  pink: {
    bg: "bg-pink-50",
    border: "border-pink-100",
    icon: "text-pink-500",
    num: "text-pink-700",
  },
};

const StatsCards = ({ stats }) => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
    {cards.map(({ title, key, icon: Icon, color, currency }) => {
      const p = palette[color];
      const raw = stats?.[key];
      const value =
        raw == null
          ? "—"
          : currency
            ? `₹${raw.toLocaleString()}`
            : raw.toLocaleString();

      return (
        <div
          key={key}
          className="bg-white border border-gray-100 rounded-xl p-5 flex items-center gap-4 hover:border-gray-200 transition-all"
        >
          <div
            className={`w-10 h-10 rounded-lg ${p.bg} ${p.border} border flex items-center justify-center flex-shrink-0`}
          >
            <Icon size={18} className={p.icon} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 font-medium truncate">
              {title}
            </p>
            <p
              className={`text-xl font-bold mt-0.5 leading-tight ${raw == null ? "text-gray-300" : p.num}`}
            >
              {value}
            </p>
          </div>
        </div>
      );
    })}
  </div>
);

export default StatsCards;
