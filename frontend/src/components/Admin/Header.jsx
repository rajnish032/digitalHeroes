import { Bell, Search, UserCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-3.5 flex items-center justify-between">
      {/* Left */}
      <div>
        <p className="text-xs text-gray-400 mt-0.5">
          Welcome back,{" "}
          <span className="text-blue-500 font-medium">{user?.name}</span>
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <UserCircle size={20} className="text-emerald-600" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800 leading-tight">
              {user?.name}
            </p>
            <p className="text-[11px] text-gray-400 capitalize leading-tight">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
