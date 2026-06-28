import { CalendarDays, CreditCard, ShieldCheck, X } from "lucide-react";

const SubscriptionCard = ({ subscription, loading, onCancel }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-4 animate-pulse space-y-2.5">
        <div className="h-3 w-28 bg-gray-100 rounded" />
        <div className="h-3 w-40 bg-gray-100 rounded" />
        <div className="h-3 w-32 bg-gray-100 rounded" />
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-lg border border-gray-100 p-6 text-center">
        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-2">
          <CreditCard size={14} className="text-gray-300" />
        </div>
        <p className="text-xs font-medium text-gray-600 mb-0.5">No active subscription</p>
        <p className="text-[11px] text-gray-400">Subscribe below to join golf draws.</p>
      </div>
    );
  }

  const isActive = subscription.status === "active";

  const fmt = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "--";

  const rows = [
    { icon: <CreditCard size={12} />, label: "Plan",        value: subscription.plan,             cls: "capitalize font-medium text-emerald-700" },
    { icon: <ShieldCheck size={12} />, label: "Status",     value: subscription.status,            cls: `capitalize font-medium ${isActive ? "text-emerald-600" : "text-red-500"}` },
    { icon: <CalendarDays size={12} />, label: "Start",     value: fmt(subscription.startDate) },
    { icon: <CalendarDays size={12} />, label: "Expiry",    value: fmt(subscription.expiryDate) },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
      <div className="bg-zinc-900 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[9px] tracking-widest uppercase text-white/30 font-medium mb-0.5">Membership</p>
          <h2 className="text-xs font-semibold text-white">Your subscription</h2>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase ${
          isActive ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25" : "bg-white/10 text-white/40 border border-white/15"
        }`}>
          {subscription.status}
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        {rows.map(({ icon, label, value, cls }) => (
          <div key={label} className="flex items-center justify-between px-4 py-2">
            <span className="flex items-center gap-1.5 text-[11px] text-gray-600">
              <span className="text-gray-500">{icon}</span>
              {label}
            </span>
            <span className={`text-[11px] text-gray-700 ${cls ?? ""}`}>{value}</span>
          </div>
        ))}
      </div>

      {isActive && (
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onCancel}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-red-500 bg-red-200 border border-red-100 hover:bg-red-300 transition-colors"
          >
            <X size={11} />
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;