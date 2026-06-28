import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Heart } from "lucide-react";
import { toast } from "react-toastify";

import CharityTable from "../../components/Admin/Charity/CharityTable";
import CharityForm from "../../components/Admin/Charity/CharityForm";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminCharities = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editCharity, setEditCharity] = useState(null);

  const getCharities = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendURL}/api/charity`, {
        withCredentials: true,
      });
      if (data.success) setCharities(data.charities);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch charities.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharities();
  }, []);

  const handleAdd = () => {
    setEditCharity(null);
    setOpenForm(true);
  };

  const handleEdit = (charity) => {
    setEditCharity(charity);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this charity?")) return;
    try {
      const { data } = await axios.delete(`${backendURL}/api/charity/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        getCharities();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete charity.");
    }
  };

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <Heart size={17} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              Charities
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {charities.length} {charities.length === 1 ? "charity" : "charities"} listed
            </p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-700 text-white text-sm font-medium transition-all active:scale-[0.98]"
        >
          <Plus size={15} />
          Add charity
        </button>
      </div>

      {/* Table */}
      <CharityTable
        charities={charities}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Form */}
      <CharityForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        editData={editCharity}
        refreshCharities={getCharities}
      />
    </>
  );
};

export default AdminCharities;