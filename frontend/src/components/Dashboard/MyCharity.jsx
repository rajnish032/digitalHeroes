import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";

const MyCharity = ({ charity, donation }) => {
  if (!charity) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">My charity</h2>
        <div className="flex flex-col items-center justify-center py-5 text-center">
          <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center mb-2.5">
            <Heart size={15} className="text-red-400" />
          </div>
          <p className="text-xs font-medium text-gray-700">No charity selected</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Choose a charity to support every month.</p>
          <Link to="/charities" className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors">
            Choose charity
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">My charity</h2>
        <Link to="/charities" className="text-[12px] text-emerald-600 hover:text-emerald-700 font-medium">Change</Link>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <img
          src={charity.image || "https://placehold.co/48x48"}
          alt={charity.name}
          className="w-10 h-10 rounded-lg object-cover border border-gray-100 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-gray-900 truncate">{charity.name}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">{charity.description}</p>
        </div>
      </div>

      <div className="space-y-2 border-t border-gray-50 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-400">Monthly contribution</span>
          <span className="text-[12px] font-medium text-gray-900">₹{donation ?? 0}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-400">Website</span>
          {charity.website ? (
            <a href={charity.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[12px] text-emerald-600 hover:underline">
              Visit <ArrowRight size={11} />
            </a>
          ) : (
            <span className="text-[12px] text-gray-300">—</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCharity;