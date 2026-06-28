import { Check } from "lucide-react";

const PlanCard = ({
  title,
  price,
  duration,
  features,
  active,
  loading,
  onSubscribe,
  popular,
  savings,
}) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
        active
          ? "border border-emerald-200 bg-emerald-50/30"
          : popular
            ? "border-[1.5px] border-blue-200 bg-white"
            : "border border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      {popular && !active && (
        <span className="absolute top-2 right-2 bg-blue-50 text-blue-500 border border-blue-100 text-[9px] font-medium px-1.5 py-0.5 rounded-full">
          Popular
        </span>
      )}

      <div className="px-4 pt-3.5 pb-3 border-b border-gray-100">
        <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">
          {duration}
        </p>
        <h2 className="text-sm font-medium text-gray-900">{title}</h2>
        <div className="mt-1.5 flex items-baseline gap-1">
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            ₹{price}
          </span>
          <span className="text-[11px] text-gray-400">
            / {duration === "Month" ? "mo" : "yr"}
          </span>
        </div>
        {savings && (
          <p className="mt-0.5 text-[10px] text-emerald-600 font-medium">
            {savings}
          </p>
        )}
      </div>

      <div className="px-4 py-2.5 space-y-1.5">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 text-[11px] text-gray-500"
          >
            <Check size={11} className="text-emerald-500 flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>

      {/* <div className="px-4 pb-3.5">
        {active ? (
          <button disabled className="w-full py-1.5 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default">
            Current plan
          </button>
        ) : (
          <button
            onClick={onSubscribe}
            disabled={loading}
            className={`w-full py-1.5 rounded-md text-[11px] font-medium transition-colors ${
              popular ? "bg-blue-500 text-white hover:bg-blue-400" : "bg-blue-500 text-white hover:bg-blue-400 border border-gray-200"
            }`}
          >
            {loading ? "Processing..." : "Subscribe"}
          </button>
        )}
      </div> */}

      <div className="px-4 pb-3.5">
        <button
          onClick={onSubscribe}
          disabled={loading || active}
          className={`w-full py-2 rounded-md text-sm font-medium transition-colors ${
            active
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
              : popular
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {loading ? "Processing..." : active ? "Current Plan" : "Subscribe"}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
