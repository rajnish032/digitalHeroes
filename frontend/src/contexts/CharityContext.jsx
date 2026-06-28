import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const CharityContext = createContext();

export const CharityProvider = ({ children }) => {
  const [charities, setCharities] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("magicalKey");

  // ==========================
  // Get All Charities
  // ==========================

  const getAllCharities = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/charity`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setCharities(res.data.charities);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch charities"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Get Charity By Id
  // ==========================

  const getCharityById = async (id) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/charity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        return res.data.charity;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch charity"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Select Charity
  // ==========================

  const selectCharity = async (id) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/charity/select-charity/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setSelectedCharity(res.data.selectedCharity);

        toast.success(res.data.message);

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to select charity"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Create Charity (Admin)
  // ==========================

  const createCharity = async (charityData) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/charity`,
        charityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getAllCharities();

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create charity"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Update Charity
  // ==========================

  const updateCharity = async (id, charityData) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/charity/${id}`,
        charityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getAllCharities();

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update charity"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Delete Charity
  // ==========================

  const deleteCharity = async (id) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${backendURL}/api/charity/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getAllCharities();

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete charity"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CharityContext.Provider
      value={{
        charities,
        selectedCharity,
        loading,

        getAllCharities,
        getCharityById,
        selectCharity,

        createCharity,
        updateCharity,
        deleteCharity,
      }}
    >
      {children}
    </CharityContext.Provider>
  );
};

export const useCharity = () => useContext(CharityContext);