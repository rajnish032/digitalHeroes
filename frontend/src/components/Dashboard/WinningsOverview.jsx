import { Link } from "react-router-dom";
import {
  Trophy,
  BadgeIndianRupee,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const statusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
          <CheckCircle2 size={10} />
          Paid
        </span>
      );
    case "approved":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 text-[11px] font-medium">
          <Clock3 size={10} />
          Approved
        </span>
      );
    case "rejected":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-500 border border-red-200 text-[11px] font-medium">
          <XCircle size={10} />
          Rejected
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-[11px] font-medium">
          <Clock3 size={10} />
          Pending
        </span>
      );
  }
};

const WinningsOverview = ({ winnings = [] }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">
          Winnings overview
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Your latest prize history
        </p>
      </div>
      <Link
        to="/winnings"
        className="text-[12px] text-emerald-600 hover:text-emerald-700 font-medium"
      >
        View all →
      </Link>
    </div>

    {winnings.length === 0 ? (
      <div className="h-32 flex flex-col items-center justify-center text-center">
        <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-2.5">
          <Trophy size={16} className="text-gray-300" />
        </div>
        <p className="text-xs font-medium text-gray-600">No winnings yet</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Participate in monthly draws to win prizes.
        </p>
      </div>
    ) : (
      <div className="space-y-1.5">
        {winnings.map((winner) => (
          <div
            key={winner._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-3 py-2.5 rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors"
          >
            <div>
              <p className="text-[12px] font-medium text-gray-900">
                {winner.draw
                  ? `${winner.draw.month} ${winner.draw.year}`
                  : "Monthly draw"}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {winner.matchCount} match
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 text-emerald-600">
                <BadgeIndianRupee size={14} />
                <span className="text-sm font-semibold tracking-tight">
                  {winner.prizeAmount?.toLocaleString()}
                </span>
              </div>
              {statusBadge(winner.status)}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default WinningsOverview;
