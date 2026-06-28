import { Pencil, Trash2, Heart, Calendar } from "lucide-react";
import PageLoader from "../../Loader";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const CharityTable = ({ charities, loading, onEdit, onDelete }) => {
  if (loading) return <PageLoader />;

  if (!charities.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <Heart size={32} className="mx-auto text-gray-200 mb-3" />
        <h2 className="text-sm font-medium text-gray-700 mb-1">
          No charities yet
        </h2>
        <p className="text-xs text-gray-400">
          Add your first charity to get started.
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
                "Charity",
                "Description",
                "Min. Contribution",
                "Added",
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
          <tbody className="divide-y divide-gray-50">
            {charities.map((charity) => (
              <tr
                key={charity._id}
                className="hover:bg-gray-50/60 transition-colors group"
              >
                {/* Charity */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      {charity.image ? (
                        <img
                          src={charity.image}
                          alt={charity.name}
                          className="w-8 h-8 rounded-lg object-cover border border-gray-100"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 items-center justify-center"
                        style={{ display: charity.image ? "none" : "flex" }}
                      >
                        <Heart size={13} className="text-rose-400" />
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${charity.isActive ? "bg-emerald-400" : "bg-gray-300"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 leading-tight">
                        {charity.name}
                      </p>
                      {charity.website && (
                        <a
                          href={charity.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          {charity.website
                            .replace(/https?:\/\//, "")
                            .replace(/\/$/, "")}
                        </a>
                      )}
                    </div>
                  </div>
                </td>

                {/* Description */}
                <td className="px-5 py-3.5 max-w-xs">
                  <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed">
                    {charity.description}
                  </p>
                </td>

                {/* Min Contribution */}
                <td className="px-5 py-3.5">
                  <span className="text-[12px] font-medium text-gray-700">
                    {charity.minimumContribution}%
                  </span>
                </td>

                {/* Added */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-1.5 text-[12px] text-gray-400">
                    <Calendar size={11} />
                    {fmtDate(charity.createdAt)}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => onEdit(charity)}
                      title="Edit"
                      className="w-8 h-8 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-500 border border-blue-100 flex items-center justify-center transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(charity._id)}
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
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">
          {charities.length} {charities.length === 1 ? "charity" : "charities"}
        </p>
      </div>
    </div>
  );
};

export default CharityTable;
