import { NavLink } from "react-router-dom";
import {LayoutDashboard,BarChart3,Heart,Trophy,Gift,CreditCard, User,LogOut,Target,} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Scores", path: "/scores", icon: BarChart3 },
  { name: "Subscription", path: "/subscription", icon: CreditCard },
  { name: "Charities", path: "/charities", icon: Heart },
  { name: "Latest Draw", path: "/draw", icon: Gift },
  { name: "My Winnings", path: "/winnings", icon: Trophy },
];

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-40">

      {/* Logo */}

      <div className="px-3 pt-7 pb-3">
  <NavLink
    to="/"
    className="flex items-center gap-2.5 group"
  >
    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
      <Target size={16} className="text-white" />
    </div>

    <div>
      <h1 className="text-sm font-bold text-gray-900">
        Golf Draw
      </h1>
      <p className="text-[11px] text-gray-400">
        Member Portal
      </p>
    </div>
  </NavLink>
</div>

      <div className="mx-5 border-t border-gray-100 mb-4" />
      <nav className="flex-1 px-3 space-y-0.5">
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
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
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

      <div className="p-4 mt-auto">

        <div className="border-t border-gray-100 pt-4">

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
          >
            <span className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center">
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