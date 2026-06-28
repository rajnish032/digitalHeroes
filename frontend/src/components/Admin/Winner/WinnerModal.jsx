import { useState } from "react";
import axios from "axios";
import { X, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const backendURL = import.meta.env.VITE_BACKEND_URL;

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

const InfoRow = ({ label, children }) => (
  <div>
    <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-1">
      {label}
    </p>
    {children}
  </div>
);

const WinnerModal = ({ open, onClose, winner, refreshWinners }) => {
  const [loading, setLoading] = useState(false);

  if (!open || !winner) return null;

 const updateStatus = async (paymentStatus) => {
  try {
    setLoading(true);

    const token = Cookies.get("magicalKey");

    const { data } = await axios.put(
      `${backendURL}/api/winner/admin/${winner._id}/status`,
      {
        paymentStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success(data.message);
      refreshWinners();
      onClose();
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to update winner."
    );
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
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-0.5">
              Admin
            </p>
            <h2 className="text-sm font-semibold text-gray-900">
              Winner Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* User + Draw info */}
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Name">
              <p className="text-sm font-medium text-gray-900">
                {winner.user?.name}
              </p>
            </InfoRow>
            <InfoRow label="Email">
              <p className="text-sm text-gray-700 truncate">
                {winner.user?.email}
              </p>
            </InfoRow>
            <InfoRow label="Draw Date">
              <p className="text-sm font-medium text-gray-900">
                {fmtDate(winner.draw?.drawDate)}
              </p>
            </InfoRow>
            <InfoRow label="Prize Amount">
              <p className="text-sm font-semibold text-emerald-600">
                ₹{winner.prizeAmount?.toLocaleString()}
              </p>
            </InfoRow>
            <InfoRow label="Match Tier">
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-200">
                {winner.matchTier}
              </span>
            </InfoRow>
            <InfoRow label="Status">
              <span
                className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize border ${statusCls[winner.paymentStatus] ?? statusCls.pending}`}
              >
                {winner.paymentStatus}
              </span>
            </InfoRow>
          </div>

          {/* Matched Numbers */}
          {winner.matchedNumbers?.length > 0 && (
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-2">
                Matched Numbers
              </p>
              <div className="flex gap-2 flex-wrap">
                {winner.matchedNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-semibold"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Payment Proof */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-2">
              Payment Proof
            </p>
            {winner.proof ? (
              <img
                src={winner.proof}
                alt="Proof"
                className="w-full max-w-xs rounded-xl border border-gray-100 object-cover"
              />
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400">
                  No payment proof uploaded.
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>

            {winner.paymentStatus === "pending" && (
              <>
                <button
                  onClick={() => updateStatus("approved")}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
                >
                  {loading && <RefreshCw size={13} className="animate-spin" />}
                  Approve
                </button>
                <button
                  onClick={() => updateStatus("rejected")}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50"
                >
                  {loading && <RefreshCw size={13} className="animate-spin" />}
                  Reject
                </button>
              </>
            )}

            {winner.paymentStatus === "approved" && (
              <button
                onClick={() => updateStatus("paid")}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors disabled:opacity-50"
              >
                {loading && <RefreshCw size={13} className="animate-spin" />}
                Mark as Paid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
