import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Heart,
  Trophy,
  Target,
  BarChart3,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const menus = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Charities", path: "/admin/charities", icon: Heart },
  { name: "Draws", path: "/admin/draws", icon: Target },
  { name: "Winners", path: "/admin/winners", icon: Trophy },
];

const Sidebar = () => {

  const { logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <Target size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-none">
              Golf Admin
            </h1>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-none">
              Management Panel
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-gray-100 mb-4" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {menus.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                isActive
                  ? "bg-emerald-50 text-emerald-700 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600"
                  }`}
                >
                  <Icon size={15} />
                </span>
                {name}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto">
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all group"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-colors">
              <LogOut size={15} />
            </span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
