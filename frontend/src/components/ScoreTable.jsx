import { Pencil, Trash2 } from "lucide-react";
import { useScore } from "../contexts/ScoreContext";



const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const ScoreTable = ({ onEdit }) => {
  const { scores, loading, deleteScore } = useScore();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this score?");
    if (!confirmDelete) return;
    await deleteScore(id);
  };


  if (!scores.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-emerald-500 font-bold text-sm">45</span>
        </div>
        <h2 className="text-sm font-medium text-gray-700 mb-1">No scores yet</h2>
        <p className="text-xs text-gray-400">Add your first score to participate in the monthly draw.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["#", "Date", "Score", "Actions"].map((h) => (
                <th key={h} className={`px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 ${h === "Actions" ? "text-center" : "text-left"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {scores.map((score, index) => (
              <tr key={score._id} className="hover:bg-gray-50/60 transition-colors">
                <td className="px-5 py-3.5 text-[12px] text-gray-400">{index + 1}</td>
                <td className="px-5 py-3.5 text-[12px] text-gray-600 whitespace-nowrap">{fmtDate(score.date)}</td>
                <td className="px-5 py-3.5">
                  <span className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-bold">
                    {score.score}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button onClick={() => onEdit(score)} title="Edit" className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-100 flex items-center justify-center transition-colors">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => handleDelete(score._id)} title="Delete" className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 flex items-center justify-center transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">{scores.length} {scores.length === 1 ? "score" : "scores"}</p>
      </div>
    </div>
  );
};

export default ScoreTable;