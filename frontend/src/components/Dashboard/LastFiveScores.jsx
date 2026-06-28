import { Link } from "react-router-dom";
import { Plus, CalendarDays } from "lucide-react";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const LastFiveScores = ({ scores = [] }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5 h-full">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-sm font-semibold text-gray-900">Last 5 scores</h2>
        <p className="text-[11px] text-gray-400 mt-0.5">Your recent rounds</p>
      </div>
      <Link
        to="/scores"
        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
      >
        <Plus size={13} /> Add score
      </Link>
    </div>

    {scores.length === 0 ? (
      <div className="h-44 flex flex-col items-center justify-center text-center">
        <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-2.5">
          <CalendarDays size={16} className="text-gray-300" />
        </div>
        <p className="text-xs font-medium text-gray-600">No scores yet</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Add your first round to get started.
        </p>
      </div>
    ) : (
      <>
        <div className="space-y-1.5">
          {scores.map((item, index) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-lg border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-colors px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-gray-100 text-gray-500 flex items-center justify-center text-[10px] font-semibold">
                  {index + 1}
                </span>
                <div>
                  <p className="text-[12px] font-medium text-gray-800">Round</p>
                  <p className="flex items-center gap-1 text-[11px] text-gray-400">
                    <CalendarDays size={10} />
                    {item.displayDate || fmtDate(item.date)}
                  </p>
                </div>
              </div>
              <span className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-semibold">
                {item.score}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-right">
          <Link
            to="/scores"
            className="text-[12px] text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View all →
          </Link>
        </div>
      </>
    )}
  </div>
);

export default LastFiveScores;
