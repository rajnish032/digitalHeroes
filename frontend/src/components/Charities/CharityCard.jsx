import { Globe, Eye, CheckCircle, Heart, X } from "lucide-react";
import { useState } from "react";
import { useCharity } from "../../contexts/CharityContext";
import { useDashboard } from "../../contexts/DashboardContext";

const DEFAULT_CHARITY_IMAGE =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop";

const CharityModal = ({ charity, onClose, isSelected, onSelect, loading }) => {
  if (!charity) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative">
          <img
            src={charity.image || DEFAULT_CHARITY_IMAGE}
            alt={charity.name}
            className="w-full h-44 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_CHARITY_IMAGE;
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={14} />
          </button>
          {isSelected && (
            <span className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              <CheckCircle size={11} /> Selected
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {charity.name}
            </h2>
            <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">
              {charity.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                Min. contribution
              </p>
              <p className="text-sm font-semibold text-indigo-600">
                ₹{charity.minimumContribution}
              </p>
            </div>
            {charity.website && (
              <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                  Website
                </p>
                <a
                  href={charity.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[12px] text-indigo-600 font-medium hover:underline"
                >
                  <Globe size={11} /> Visit
                </a>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={onSelect}
              disabled={loading || isSelected}
              className={`flex-1 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
                isSelected
                  ? "bg-emerald-600 cursor-default"
                  : "bg-gray-900 hover:bg-gray-800"
              } disabled:opacity-60`}
            >
              {loading ? "Selecting..." : isSelected ? "Selected" : "Select"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CharityCard = ({ charity }) => {
  const { selectCharity } = useCharity();
  const { refreshDashboard, dashboard } = useDashboard();

  const [modalOpen, setModalOpen] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const isSelected = dashboard?.selectedCharity?._id === charity._id;

  const handleSelect = async () => {
    if (isSelected || selecting) return;

    try {
      setSelecting(true);

      await selectCharity(charity._id);

      await refreshDashboard();
    } catch (err) {
      console.error(err);
    } finally {
      setSelecting(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all duration-200">
        {/* Image */}
        <div className="relative">
          <img
            src={charity.image || DEFAULT_CHARITY_IMAGE}
            alt={charity.name}
            className="w-full h-36 object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = DEFAULT_CHARITY_IMAGE;
            }}
          />

          {isSelected && (
            <span className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              <CheckCircle size={10} />
              Selected
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Heart size={12} className="text-red-400 flex-shrink-0" />

            <h2 className="text-sm font-semibold text-gray-900 truncate">
              {charity.name}
            </h2>
          </div>

          <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {charity.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">
                Min. contribution
              </p>

              <p className="text-sm font-semibold text-indigo-600">
                ₹{charity.minimumContribution}
              </p>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Eye size={12} />
              Details
            </button>
          </div>

          <button
            disabled={selecting || isSelected}
            onClick={handleSelect}
            className={`w-full py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
              isSelected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            } disabled:opacity-60`}
          >
            {selecting
              ? "Selecting..."
              : isSelected
                ? "Selected"
                : "Select Charity"}
          </button>
        </div>
      </div>

      <CharityModal
        charity={modalOpen ? charity : null}
        onClose={() => setModalOpen(false)}
        isSelected={isSelected}
        onSelect={async () => {
          await handleSelect();
          setModalOpen(false);
        }}
        loading={selecting}
      />
    </>
  );
};
//Grid
export const CharityGrid = ({ charities }) => {
  if (!charities.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <Heart size={32} className="mx-auto text-gray-200 mb-3" />
        <p className="text-sm font-medium text-gray-600 mb-1">
          No charities found
        </p>
        <p className="text-[11px] text-gray-400">Check back later.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {charities.map((c) => (
        <CharityCard key={c._id} charity={c} />
      ))}
    </div>
  );
};

export default CharityCard;
