import { Trophy, Clock, CheckCircle, Wallet } from "lucide-react";

const WinnerStats = ({ winners }) => {
  const total = winners.length;
  const pending = winners.filter((w) => w.paymentStatus === "pending").length;
  const approved = winners.filter((w) => w.paymentStatus === "approved").length;
  const paid = winners.filter((w) => w.paymentStatus === "paid").length;
  const totalPrize = winners.reduce((sum, w) => sum + (w.prizeAmount || 0), 0);

  const cards = [
    {
      title: "Total Winners",
      value: total,
      icon: Trophy,
      iconCls: "text-amber-500",
      bgCls: "bg-amber-50 border-amber-100",
    },
    {
      title: "Pending",
      value: pending,
      icon: Clock,
      iconCls: "text-orange-500",
      bgCls: "bg-orange-50 border-orange-100",
    },
    {
      title: "Approved",
      value: approved,
      icon: CheckCircle,
      iconCls: "text-blue-500",
      bgCls: "bg-blue-50 border-blue-100",
    },
    {
      title: "Prize Paid",
      value: `₹${totalPrize.toLocaleString()}`,
      icon: Wallet,
      iconCls: "text-emerald-600",
      bgCls: "bg-emerald-50 border-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ title, value, icon: Icon, iconCls, bgCls }) => (
        <div
          key={title}
          className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1">
              {title}
            </p>
            <p className="text-2xl font-semibold text-gray-900 leading-tight">
              {value}
            </p>
          </div>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border flex-shrink-0 ${bgCls}`}
          >
            <Icon size={18} className={iconCls} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnerStats;
