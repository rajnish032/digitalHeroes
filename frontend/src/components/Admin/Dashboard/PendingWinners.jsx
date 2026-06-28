import { Link } from "react-router-dom";
import { Trophy, ArrowRight } from "lucide-react";

const PendingWinners = ({ winners }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2.5">
        <h2 className="text-sm font-semibold text-gray-800">Pending winners</h2>
        {winners?.length > 0 && (
          <span className="px-1.5 py-0.5 rounded-md bg-amber-50 border border-amber-100 text-[11px] font-semibold text-amber-600">
            {winners.length}
          </span>
        )}
      </div>
      <Link
        to="/admin/winners"
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        View all <ArrowRight size={12} />
      </Link>
    </div>

    {!winners?.length ? (
      <div className="h-40 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <Trophy size={18} className="text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">All caught up</p>
        <p className="text-xs text-gray-300">No winners awaiting approval</p>
      </div>
    ) : (
      <div className="divide-y divide-gray-50">
        {winners.map((winner) => (
          <div
            key={winner._id}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                <Trophy size={14} className="text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {winner.user?.name}
                </p>
                {winner.matchCount != null && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {winner.matchCount} matches
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              {winner.prizeAmount != null && (
                <p className="text-sm font-semibold text-emerald-600">
                  ₹{winner.prizeAmount.toLocaleString()}
                </p>
              )}
              <span className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-100 text-[11px] font-medium text-amber-600">
                Pending
              </span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default PendingWinners;
