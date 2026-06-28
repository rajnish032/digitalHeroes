import { Trophy, CalendarDays } from "lucide-react";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const statusCls = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed: "bg-amber-50 text-amber-600 border border-amber-200",
  pending:   "bg-gray-100 text-gray-500 border border-gray-200",
};

const DrawCard = ({ latestDraw, draws, loading }) => {
  if (loading) return null;

  return (
    <div className="space-y-5">

      {/* Latest Draw */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <Trophy size={15} className="text-amber-500" />
          <div>
            <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400">Latest</p>
            <h2 className="text-sm font-semibold text-gray-900 leading-tight">Latest Draw</h2>
          </div>
        </div>

        {!latestDraw ? (
          <div className="p-10 text-center">
            <Trophy size={28} className="mx-auto text-gray-200 mb-2" />
            <p className="text-sm font-medium text-gray-600 mb-1">No draw published yet</p>
            <p className="text-[11px] text-gray-400">Latest draw will appear here.</p>
          </div>
        ) : (
          <div className="p-5">
            {/* Winning numbers */}
            <div className="flex flex-wrap gap-2 mb-5">
              {latestDraw.winningNumbers?.map((num) => (
                <div key={num} className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                  {num}
                </div>
              ))}
            </div>

            {/* Meta */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Draw Date", value: fmtDate(latestDraw.drawDate) },
                { label: "Prize Pool", value: `₹${latestDraw.prizePool?.toLocaleString()}` },
                { label: "Status", value: latestDraw.status, isPill: true },
              ].map(({ label, value, isPill }) => (
                <div key={label}>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                  {isPill ? (
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusCls[value] ?? statusCls.pending}`}>
                      {value}
                    </span>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Draw History */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <CalendarDays size={14} className="text-gray-400" />
          <h2 className="text-sm font-semibold text-gray-900">Draw History</h2>
        </div>

        {!draws.length ? (
          <div className="p-8 text-center">
            <p className="text-xs text-gray-400">No previous draws available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Draw Date", "Winning Numbers", "Prize Pool", "Status"].map((h) => (
                    <th key={h} className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {draws.map((draw) => (
                  <tr key={draw._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-3 text-[12px] text-gray-600 whitespace-nowrap">{fmtDate(draw.drawDate)}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {draw.winningNumbers?.map((num) => (
                          <span key={num} className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center text-[11px] font-semibold">
                            {num}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[12px] font-medium text-gray-700">₹{draw.prizePool?.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusCls[draw.status] ?? statusCls.pending}`}>
                        {draw.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawCard;