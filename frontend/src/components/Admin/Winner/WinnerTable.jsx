import { Eye, Trash2, Trophy } from "lucide-react";
import PageLoader from "../../Loader";

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const statusCls = {
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  approved: "bg-blue-50 text-blue-600 border-blue-200",
  rejected: "bg-red-50 text-red-500 border-red-200",
  pending: "bg-amber-50 text-amber-600 border-amber-200",
};

const WinnerTable = ({ winners, loading, onView, }) => {
  if (loading) return <PageLoader />;

  if (!winners.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <Trophy size={32} className="mx-auto text-gray-200 mb-3" />
        <h2 className="text-sm font-medium text-gray-700 mb-1">
          No winners yet
        </h2>
        <p className="text-xs text-gray-400">
          Winners will appear after a draw is completed.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {[
                "Winner",
                "Draw Date",
                "Match Tier",
                "Prize",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 ${h === "Actions" ? "text-center" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {winners.map((winner) => (
              <tr
                key={winner._id}
                className="hover:bg-gray-50/60 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <p className="font-medium text-gray-900 leading-tight">
                    {winner.user?.name}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {winner.user?.email}
                  </p>
                </td>
                <td className="px-5 py-3.5 text-[12px] text-gray-500 whitespace-nowrap">
                  {fmtDate(winner.draw?.drawDate)}
                </td>
                <td className="px-5 py-3.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-200">
                    {winner.matchTier}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-[12px] font-semibold text-emerald-600">
                  ₹{winner.prizeAmount?.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize border ${statusCls[winner.paymentStatus] ?? statusCls.pending}`}
                  >
                    {winner.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => onView(winner)}
                      title="View"
                      className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-100 flex items-center justify-center transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          {winners.length} {winners.length === 1 ? "winner" : "winners"}
        </p>
      </div>
    </div>
  );
};

export default WinnerTable;
