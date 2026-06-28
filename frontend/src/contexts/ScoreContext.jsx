import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("magicalKey");

  // =============================
  // Get Scores
  // =============================

  const getScores = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/score`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setScores(res.data.scores);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch scores"
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Add Score
  // =============================

  const createScore = async (scoreData) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendURL}/api/score`,
        scoreData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getScores();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to add score"
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Update Score
  // =============================

  const updateScore = async (id, scoreData) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/score/${id}`,
        scoreData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getScores();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update score"
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Delete Score
  // =============================

  const deleteScore = async (id) => {
    try {
      setLoading(true);

      const res = await axios.delete(
        `${backendURL}/api/score/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        await getScores();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete score"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScoreContext.Provider
      value={{
        scores,
        loading,

        getScores,
        createScore,
        updateScore,
        deleteScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);