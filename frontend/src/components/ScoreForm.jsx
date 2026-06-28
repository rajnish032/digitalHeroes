import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useScore } from "../contexts/ScoreContext";

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/10 bg-white";

const ScoreForm = ({ open, onClose, editData = null }) => {
  const { createScore, updateScore, loading } = useScore();
  const [formData, setFormData] = useState({ score: "", date: "" });

  useEffect(() => {
    setFormData(
      editData
        ? { score: editData.score, date: editData.date?.split("T")[0] }
        : { score: "", date: "" }
    );
  }, [editData]);

  if (!open) return null;

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    editData ? await updateScore(editData._id, formData) : await createScore(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-0.5">Score</p>
            <h2 className="text-sm font-semibold text-gray-900">{editData ? "Edit Score" : "Add Score"}</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Score (1–45)</label>
            <input
              type="number"
              name="score"
              min="1"
              max="45"
              value={formData.score}
              onChange={handleChange}
              required
              placeholder="e.g. 32"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className={inputCls}
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50">
              {loading ? "Saving..." : editData ? "Update" : "Add Score"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreForm;