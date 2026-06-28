import { Link } from "react-router-dom";
import { CalendarDays, Trophy, ArrowRight } from "lucide-react";

const Row = ({ label, children }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
    <span className="text-xs text-gray-400">{label}</span>
    <div className="text-sm font-medium text-gray-800">{children}</div>
  </div>
);

const RecentDraws = ({ draw }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <div>
        <h2 className="text-sm font-semibold text-gray-800">Latest draw</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Most recent published draw
        </p>
      </div>
      <Link
        to="/admin/draws"
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        View all <ArrowRight size={12} />
      </Link>
    </div>

    {!draw ? (
      <div className="h-48 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <CalendarDays size={18} className="text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">No draw yet</p>
        <p className="text-xs text-gray-300">Run your first monthly draw</p>
      </div>
    ) : (
      <div className="px-5 py-1">
        {(draw.month || draw.year) && (
          <Row label="Draw">
            {draw.month} {draw.year}
          </Row>
        )}
        {draw.drawType && (
          <Row label="Type">
            <span className="capitalize">{draw.drawType}</span>
          </Row>
        )}
        {draw.prizePool != null && (
          <Row label="Prize pool">
            <span className="text-emerald-600 font-semibold">
              ₹{draw.prizePool.toLocaleString()}
            </span>
          </Row>
        )}
        {draw.status && (
          <Row label="Status">
            <span
              className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                draw.status === "published"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-amber-50 text-amber-600 border-amber-100"
              }`}
            >
              {draw.status}
            </span>
          </Row>
        )}
        {draw.winningNumbers?.length > 0 && (
          <div className="py-3 border-b border-gray-50">
            <p className="text-xs text-gray-400 mb-2.5">Winning numbers</p>
            <div className="flex flex-wrap gap-1.5">
              {draw.winningNumbers.map((num) => (
                <div
                  key={num}
                  className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center text-xs font-bold"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
        {draw.totalWinners != null && (
          <Row label="Winners">
            <div className="flex items-center gap-1.5">
              <Trophy size={14} className="text-amber-500" />
              {draw.totalWinners}
            </div>
          </Row>
        )}
      </div>
    )}
  </div>
);

export default RecentDraws;
