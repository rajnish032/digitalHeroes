import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const DrawContext = createContext();

export const DrawProvider = ({ children }) => {
  const [draws, setDraws] = useState([]);
  const [latestDraw, setLatestDraw] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("magicalKey");

  // ==========================
  // Latest Draw
  // ==========================

  const getLatestDraw = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/draw/latest`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLatestDraw(res.data.draw);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load latest draw"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Draw History
  // ==========================

  const getAllDraws = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/draw`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setDraws(res.data.draws);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch draws"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Admin Run Draw
  // ==========================

  const runDraw = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/draw/run`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        getAllDraws();

        return res.data;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to run draw"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Publish Draw
  // ==========================

  const publishDraw = async (id) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/draw/${id}/publish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        getAllDraws();
        getLatestDraw();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to publish draw"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Delete Draw
  // ==========================

  const deleteDraw = async (id) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${backendURL}/api/draw/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        getAllDraws();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete draw"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawContext.Provider
      value={{
        draws,
        latestDraw,
        loading,

        getLatestDraw,
        getAllDraws,

        runDraw,
        publishDraw,
        deleteDraw,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
};

export const useDraw = () => useContext(DrawContext);