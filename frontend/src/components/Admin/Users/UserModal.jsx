import { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Field = ({ label, children }) => (
  <div>
    <label className="block text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-colors";

const statusCls = {
  active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  expired: "bg-red-50 text-red-500 border border-red-200",
  cancelled: "bg-gray-100 text-gray-500 border border-gray-200",
  pending: "bg-amber-50 text-amber-600 border border-amber-200",
};

const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

const UserModal = ({ open, onClose, user, refreshUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = user?.user || user;
    if (u)
      setFormData({
        name: u.name || "",
        email: u.email || "",
        role: u.role || "user",
      });
  }, [user]);

  if (!open) return null;

  const currentUser = user?.user || user;

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = Cookies.get("magicalKey");
    const id = user?.user?._id || user?._id;

    const { data } = await axios.put(
      `${backendURL}/api/admin/users/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (data.success) {
      toast.success("User updated");
      refreshUsers();
      onClose();
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Update failed."
    );
  } finally {
    setLoading(false);
  }
};

  const sub = currentUser?.subscription;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-gray-400 font-medium mb-0.5">
              Admin
            </p>
            <h2 className="text-sm font-semibold text-gray-900">
              User Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-5 space-y-5">
          {/* Basic info */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputCls}
              />
            </Field>
            <Field label="Role">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputCls}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </Field>
          </div>

          {/* Subscription */}
          <div>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
              Subscription
            </p>
            {sub ? (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Plan
                  </p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {sub.plan}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Status
                  </p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${statusCls[sub.status] ?? statusCls.pending}`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    Expiry
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {fmtDate(sub.expiryDate)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-xs text-gray-400">No active subscription</p>
              </div>
            )}
          </div>

          {/* Charity */}
          <div>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
              Charity
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <p className="text-sm text-gray-700">
                {currentUser?.selectedCharity?.name || (
                  <span className="text-gray-400">No charity selected</span>
                )}
              </p>
            </div>
          </div>

          {/* Scores */}
          {user?.scores?.length > 0 && (
            <div>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Scores
              </p>
              <div className="flex flex-wrap gap-2">
                {user.scores.map((s) => (
                  <span
                    key={s._id}
                    className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold"
                  >
                    {s.score}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Winnings */}
          {user?.winnings?.length > 0 && (
            <div>
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">
                Winnings
              </p>
              <div className="space-y-2">
                {user.winnings.map((w) => (
                  <div
                    key={w._id}
                    className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5"
                  >
                    <span className="text-xs text-gray-500">
                      {w.matchedNumbers} matches
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      ₹{w.prizeAmount?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
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
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
