import { useEffect, useState } from "react";
import axios from "axios";
import { Trophy } from "lucide-react";
import { toast } from "react-toastify";

import WinnerTable from "../../components/Admin/Winner/WinnerTable";
import WinnerModal from "../../components/Admin/Winner/WinnerModal";
import WinnerStats from "../../components/Admin/Winner/WinnerStats";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminWinners = () => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getWinners = async () => {
  try {
    setLoading(true);

    const { data } = await axios.get(
      `${backendURL}/api/winner/admin`,
      {
        withCredentials: true,
      }
    );

    if (data.success) {
      setWinners(data.winners);

      // Keep modal data in sync
      if (selectedWinner) {
        const updatedWinner = data.winners.find(
          (w) => w._id === selectedWinner._id
        );

        if (updatedWinner) {
          setSelectedWinner(updatedWinner);
        }
      }
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to fetch winners."
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getWinners();
  }, []);

  const handleView = (winner) => {
    setSelectedWinner(winner);
    setOpenModal(true);
  };



  return (
    <>
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
          <Trophy size={17} className="text-amber-500" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 leading-tight">
            Winners
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            {winners.length} {winners.length === 1 ? "winner" : "winners"} total
          </p>
        </div>
      </div>

      {/* Stats */}
      <WinnerStats winners={winners} />

      {/* Table */}
      <div className="mt-6">
        <WinnerTable
          winners={winners}
          loading={loading}
          onView={handleView}
        />
      </div>

      {/* Modal */}
      <WinnerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        winner={selectedWinner}
        refreshWinners={getWinners}
      />
    </>
  );
};

export default AdminWinners;