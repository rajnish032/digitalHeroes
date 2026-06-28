import { Eye, Pencil, Trash2, UserCircle } from "lucide-react";
import PageLoader from "../../Loader";

const roleCls = {
  admin: "bg-purple-50 text-purple-600 border border-purple-200",
  user: "bg-slate-100 text-slate-600 border border-slate-200",
};

const subCls = {
  active: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  inactive: "bg-red-50 text-red-500 border border-red-200",
};

const UserTable = ({ users, loading, onView, onEdit, onDelete }) => {
  if (loading) return <PageLoader />;

  if (!users.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <UserCircle size={36} className="mx-auto text-gray-200 mb-3" />
        <h2 className="text-sm font-medium text-gray-700 mb-1">
          No users found
        </h2>
        <p className="text-xs text-gray-400">No registered users yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["User", "Role", "Subscription", "Charity", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className={`px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400 ${h === "Actions" ? "text-center" : "text-left"}`}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50/60 transition-colors"
              >
                {/* User */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 leading-tight">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${roleCls[user.role] ?? roleCls.user}`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* Subscription */}
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${user.subscription?.status === "active" ? subCls.active : subCls.inactive}`}
                  >
                    {user.subscription?.status === "active"
                      ? "Active"
                      : "Inactive"}
                  </span>
                </td>

                {/* Charity */}
                <td className="px-5 py-3.5 text-[12px] text-gray-500">
                  {user.selectedCharity?.name || (
                    <span className="text-gray-300">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => onView(user._id)}
                      title="View"
                      className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-100 flex items-center justify-center transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      title="Edit"
                      className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 flex items-center justify-center transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      title="Delete"
                      className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 flex items-center justify-center transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
