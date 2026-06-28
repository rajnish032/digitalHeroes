import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1.5">
      {label}
    </label>
    <input
      {...props}
      className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors"
    />
  </div>
);

const DrawForm = ({ open, onClose, refreshDraws }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ prizePool: "", drawDate: "" });

  if (!open) return null;

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendURL}/api/draw/admin/run`,
        formData,
        { withCredentials: true },
      );
      if (data.success) {
        toast.success(data.message);
        refreshDraws();
        onClose();
        setFormData({ prizePool: "", drawDate: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to run draw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-0.5">
              Admin
            </p>
            <h2 className="text-sm font-semibold text-gray-900">Run a Draw</h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <Field
            label="Prize Pool (₹)"
            type="number"
            name="prizePool"
            value={formData.prizePool}
            onChange={handleChange}
            placeholder="50000"
            required
          />
          <Field
            label="Draw Date"
            type="date"
            name="drawDate"
            value={formData.drawDate}
            onChange={handleChange}
            required
          />

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-60"
            >
              {loading ? "Running..." : "Run Draw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DrawForm;
