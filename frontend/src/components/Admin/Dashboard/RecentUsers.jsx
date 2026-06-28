import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

const RecentUsers = ({ users }) => (
  <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
      <div>
        <h2 className="text-sm font-semibold text-gray-800">Recent users</h2>
        <p className="text-xs text-gray-400 mt-0.5">Latest registrations</p>
      </div>
      <Link
        to="/admin/users"
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
      >
        View all <ArrowRight size={12} />
      </Link>
    </div>

    {!users?.length ? (
      <div className="h-48 flex flex-col items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
          <Users size={18} className="text-gray-300" />
        </div>
        <p className="text-sm font-medium text-gray-500">No users yet</p>
        <p className="text-xs text-gray-300">New users will appear here</p>
      </div>
    ) : (
      <div className="divide-y divide-gray-50">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-emerald-600">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-3">
              <span
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                  user.role === "admin"
                    ? "bg-blue-50 text-blue-600 border-blue-100"
                    : "bg-gray-50 text-gray-500 border-gray-100"
                }`}
              >
                {user.role}
              </span>
              {user.createdAt && (
                <p className="text-[11px] text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RecentUsers;
