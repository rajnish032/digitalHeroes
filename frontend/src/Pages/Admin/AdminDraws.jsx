import { useEffect, useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import DrawForm from "../../components/Admin/ Draw/DrawForm";
import DrawTable from "../../components/Admin/ Draw/DrawTable";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminDraws = () => {
  const [draws, setDraws] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  // ============================
  // Get All Draws
  // ============================

  const getDraws = async () => {
    try {
      const token = Cookies.get("magicalKey");

      const { data } = await axios.get(
        `${backendURL}/api/draw/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        setDraws(data.draws);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch draws."
      );
    }
  };

  useEffect(() => {
    getDraws();
  }, []);

  // ============================
  // Publish Draw
  // ============================

  const publishDraw = async (id) => {
    try {
      const token = Cookies.get("magicalKey");

      const { data } = await axios.put(
        `${backendURL}/api/draw/admin/${id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDraws();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to publish draw."
      );
    }
  };

  // ============================
  // Delete Draw
  // ============================

  const deleteDraw = async (id) => {
    if (!window.confirm("Delete this draw?")) return;

    try {
      const token = Cookies.get("magicalKey");

      const { data } = await axios.delete(
        `${backendURL}/api/draw/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getDraws();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete draw."
      );
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Draw Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {draws.length} {draws.length === 1 ? "draw" : "draws"} available
          </p>
        </div>

        <button
          onClick={() => setOpenForm(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Run Draw
        </button>
      </div>

      {/* Draw Table */}
      <DrawTable
        draws={draws}
        onPublish={publishDraw}
        onDelete={deleteDraw}
      />

      {/* Draw Form */}
      <DrawForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        refreshDraws={getDraws}
      />
    </>
  );
};

export default AdminDraws;