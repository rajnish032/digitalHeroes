import { CheckCircle2, Crown, AlertCircle } from "lucide-react";

const SubscriptionBanner = ({ subscription }) => {
  if (!subscription) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-gray-900">No active subscription</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Subscribe to participate in monthly draws.</p>
          </div>
        </div>
        <a href="/subscription" className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-xs font-medium transition-colors">
          Subscribe
        </a>
      </div>
    );
  }

  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <Crown size={15} className="text-emerald-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 capitalize">{subscription.plan} plan</p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Expires {new Date(subscription.expiryDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            · ₹{subscription.amount} · {subscription.daysLeft} days left
          </p>
        </div>
      </div>
      <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-3 py-1 rounded-full text-[11px] font-medium self-start sm:self-auto">
        <CheckCircle2 size={12} /> Active
      </span>
    </div>
  );
};

export default SubscriptionBanner;