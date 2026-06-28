import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Users } from "lucide-react";
import { toast } from "react-toastify";

import UserTable from "../../components/Admin/Users/UserTable";
import UserModal from "../../components/Admin/Users/UserModal";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendURL}/api/admin/users`, {
        withCredentials: true,
      });
      if (data.success) setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const viewUser = async (id) => {
    try {
      const { data } = await axios.get(`${backendURL}/api/admin/users/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        setSelectedUser(data);
        setOpenModal(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load user.");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const { data } = await axios.delete(`${backendURL}/api/admin/users/${id}`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success(data.message);
        getUsers();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
            <Users size={17} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">
              Users
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {users.length} registered {users.length === 1 ? "user" : "users"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-gray-100 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <UserTable
        users={filteredUsers}
        loading={loading}
        onView={viewUser}
        onEdit={(user) => {
          setSelectedUser(user);
          setOpenModal(true);
        }}
        onDelete={deleteUser}
      />

      {/* Modal */}
      <UserModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        refreshUsers={getUsers}
      />
    </>
  );
};

export default AdminUsers;