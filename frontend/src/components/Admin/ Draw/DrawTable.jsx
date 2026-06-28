import { useState } from "react";
import {
  Upload,
  Trash2,
  Trophy,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";
import PageLoader from "../../Loader";

const statusCls = {
  published: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  completed: "bg-amber-50 text-amber-700 border border-amber-200",
  pending: "bg-slate-100 text-slate-600 border border-slate-200",
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// ── Confirm modal ─────────────────────────────────────────────────────────────
const ConfirmModal = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  loading,
  danger,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 ${danger ? "bg-red-50" : "bg-emerald-50"}`}
        >
          <AlertCircle
            size={18}
            className={danger ? "text-red-500" : "text-emerald-600"}
          />
        </div>
        <h3 className="text-sm font-semibold text-gray-900 text-center mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-400 text-center mb-5">{description}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2 rounded-lg text-xs font-medium text-white transition-colors disabled:opacity-50 ${danger ? "bg-red-500 hover:bg-red-600" : "bg-emerald-600 hover:bg-emerald-700"}`}
          >
            {loading ? "Please wait..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Draw row ──────────────────────────────────────────────────────────────────
const DrawRow = ({ draw, onPublish, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [actLoading, setActLoading] = useState(false);

  const handlePublish = async () => {
    setActLoading(true);
    await onPublish(draw._id);
    setActLoading(false);
    setConfirmPublish(false);
  };

  const handleDelete = async () => {
    setActLoading(true);
    await onDelete(draw._id);
    setActLoading(false);
    setConfirmDelete(false);
  };

  return (
    <>
      <tr className="border-t border-gray-100 hover:bg-gray-50/60 transition-colors">
        {/* Date */}
        <td className="px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap">
          {fmtDate(draw.drawDate)}
        </td>

        {/* Numbers */}
        <td className="px-5 py-3.5">
          <div className="flex flex-wrap gap-1.5">
            {draw.winningNumbers?.map((num) => (
              <span
                key={num}
                className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-semibold"
              >
                {num}
              </span>
            ))}
          </div>
        </td>

        {/* Prize Pool */}
        <td className="px-5 py-3.5 text-sm font-medium text-gray-800">
          ₹{draw.prizePool?.toLocaleString()}
        </td>

        {/* Jackpot */}
        <td className="px-5 py-3.5 text-sm font-semibold text-indigo-600">
          ₹{draw.jackpot?.toLocaleString()}
        </td>

        {/* Status */}
        <td className="px-5 py-3.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusCls[draw.status] ?? statusCls.pending}`}
          >
            {draw.status}
          </span>
        </td>

        {/* Actions */}
        <td className="px-5 py-3.5">
          <div className="flex items-center justify-center gap-1.5">
            {draw.status !== "published" && (
              <button
                onClick={() => setConfirmPublish(true)}
                title="Publish"
                className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors border border-emerald-100"
              >
                <Upload size={14} />
              </button>
            )}
            <button
              onClick={() => setConfirmDelete(true)}
              title="Delete"
              className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors border border-red-100"
            >
              <Trash2 size={14} />
            </button>
            {draw.winners?.length > 0 && (
              <button
                onClick={() => setExpanded((p) => !p)}
                title="Winners"
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors border border-slate-200"
              >
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* expanded winners */}
      {expanded && draw.winners?.length > 0 && (
        <tr className="bg-gray-50">
          <td colSpan={6} className="px-5 py-3">
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-2">
              Winners
            </p>
            <div className="flex flex-col gap-1.5">
              {draw.winners.map((w, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-base">
                    {["🥇", "🥈", "🥉"][i] ?? `#${i + 1}`}
                  </span>
                  <span className="font-medium text-gray-800">
                    {w.user?.name ?? "—"}
                  </span>
                  <span className="text-gray-400 text-xs">{w.user?.email}</span>
                  {w.prize && (
                    <span className="ml-auto text-xs font-semibold text-amber-600">
                      {w.prize}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}

      <ConfirmModal
        open={confirmPublish}
        title="Publish this draw?"
        description="Winners will be visible to all users once published."
        onConfirm={handlePublish}
        onCancel={() => setConfirmPublish(false)}
        loading={actLoading}
        danger={false}
      />
      <ConfirmModal
        open={confirmDelete}
        title="Delete this draw?"
        description="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
        loading={actLoading}
        danger={true}
      />
    </>
  );
};

// ── DrawTable ─────────────────────────────────────────────────────────────────
const DrawTable = ({ draws, loading, onPublish, onDelete }) => {
  if (loading) return <PageLoader />;

  if (!draws.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <Trophy size={36} className="mx-auto text-gray-200 mb-3" />
        <h2 className="text-sm font-medium text-gray-700 mb-1">No draws yet</h2>
        <p className="text-xs text-gray-400">
          Run your first draw to get started.
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
                "Draw Date",
                "Winning Numbers",
                "Prize Pool",
                "Jackpot",
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
          <tbody>
            {draws.map((draw) => (
              <DrawRow
                key={draw._id}
                draw={draw}
                onPublish={onPublish}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrawTable;
