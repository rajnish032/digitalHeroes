import { createContext, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const WinnerContext = createContext();

export const WinnerProvider = ({ children }) => {
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("magicalKey");

  const getMyWinnings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${backendURL}/api/winner/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setWinnings(res.data.winnings);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch winnings"
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProof = async (id, proofUrl) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${backendURL}/api/winner/${id}/upload-proof`,
        {
          proofUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        getMyWinnings();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Proof upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <WinnerContext.Provider
      value={{
        winnings,
        loading,
        getMyWinnings,
        uploadProof,
      }}
    >
      {children}
    </WinnerContext.Provider>
  );
};

export const useWinner = () => useContext(WinnerContext);