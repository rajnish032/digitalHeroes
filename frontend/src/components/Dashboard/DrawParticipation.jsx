import { CalendarDays, Trophy, Clock } from "lucide-react";

const statusStyle = (status) => {
  const s = status?.toLowerCase() ?? "";
  if (s.includes("match") || s.includes("win"))
    return {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      icon: <Trophy size={11} />,
    };
  if (s.includes("upcoming"))
    return {
      cls: "bg-purple-50 text-purple-600 border-purple-200",
      icon: <CalendarDays size={11} />,
    };
  return {
    cls: "bg-gray-100 text-gray-500 border-gray-200",
    icon: <Clock size={11} />,
  };
};

const DrawParticipation = ({ draws = [] }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-5">
    <div className="mb-4">
      <h2 className="text-sm font-semibold text-gray-900">
        Draw participation
      </h2>
      <p className="text-[11px] text-gray-400 mt-0.5">Recent activity</p>
    </div>

    {draws.length === 0 ? (
      <div className="h-32 flex flex-col justify-center items-center text-center">
        <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center mb-2.5">
          <CalendarDays size={16} className="text-gray-300" />
        </div>
        <p className="text-xs font-medium text-gray-600">No draw history</p>
        <p className="text-[11px] text-gray-400 mt-0.5">
          Participate in a monthly draw to see history.
        </p>
      </div>
    ) : (
      <div className="space-y-1.5">
        {draws.map((draw) => {
          const { cls, icon } = statusStyle(draw.status);
          return (
            <div
              key={draw._id}
              className="flex justify-between items-center border border-gray-100 rounded-lg px-3 py-2.5 hover:border-emerald-200 transition-colors"
            >
              <div>
                <p className="text-[12px] font-medium text-gray-900">
                  {draw.month}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  Monthly golf draw
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${cls}`}
              >
                {icon}
                {draw.status}
              </span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default DrawParticipation;
