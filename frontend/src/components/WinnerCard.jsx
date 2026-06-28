import { Upload, Trophy, CalendarDays, CheckCircle } from "lucide-react";

const statusCls = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-blue-50 text-blue-700 border-blue-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

const WinnerCard = ({ winnings, onUpload }) => {
  if (!winnings.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-10 text-center">
        <Trophy className="mx-auto mb-3 text-gray-300" size={40} />

        <h2 className="text-lg font-semibold text-gray-900">
          No Winnings Yet
        </h2>

        <p className="text-sm text-gray-500 mt-2">
          You haven't won any prize yet. Keep participating in the monthly draws.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {winnings.map((winner) => (
        <div
          key={winner._id}
          className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={18} />
                <h2 className="text-2xl font-bold text-emerald-600">
                  ₹{winner.prizeAmount.toLocaleString()}
                </h2>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={15} />
                  <span>
                    Draw: {winner.draw?.month}/{winner.draw?.year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle size={15} />
                  <span>Tier: {winner.matchTier}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full border text-xs font-medium capitalize ${
                      statusCls[winner.paymentStatus] || statusCls.pending
                    }`}
                  >
                    {winner.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {winner.paymentStatus === "pending" && !winner.proof && (
              <button
                onClick={() => onUpload(winner)}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition"
              >
                <Upload size={16} />
                Upload Proof
              </button>
            )}

            {winner.proof && (
              <span className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 border border-green-200">
                Proof Uploaded
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WinnerCard;