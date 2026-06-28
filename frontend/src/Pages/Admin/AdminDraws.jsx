import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Target } from "lucide-react";
import { toast } from "react-toastify";
import DrawForm from "../../components/Admin/ Draw/DrawForm";
import DrawTable from "../../components/Admin/ Draw/DrawTable";



const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminDraws = () => {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);

  // ============================
  // Get All Draws
  // ============================

  const getDraws = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendURL}/api/draw/admin`,
        {
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
    } finally {
      setLoading(false);
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
      const { data } = await axios.put(
        `${backendURL}/api/draw/admin/${id}/publish`,
        {},
        {
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
    

    try {
      const { data } = await axios.delete(
        `${backendURL}/api/draw/admin/${id}`,
        {
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
      {/* Page Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          

           <div>
              
              <h1 className="text-xl font-semibold text-gray-900">Draw Management</h1>
            </div>
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
        loading={loading}
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