import { useEffect, useState } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";

import WinnerCard from "../../components/WinnerCard";
import UploadProofModal from "../../components/UploadProofModal";

import { useWinner } from "../../contexts/WinnerContext";

const Winnings = () => {
  const {
    winnings,
    getMyWinnings,
    uploadProof,
  } = useWinner();

  const [openModal, setOpenModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);

  useEffect(() => {
    getMyWinnings();
  }, []);

  const handleOpenModal = (winner) => {
    setSelectedWinner(winner);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedWinner(null);
    setOpenModal(false);
  };

  const handleUpload = async (file) => {
    // TODO:
    // const proofUrl = await uploadToCloudinary(file);

    const proofUrl = "YOUR_CLOUDINARY_IMAGE_URL";

    await uploadProof(selectedWinner._id, proofUrl);

    handleCloseModal();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 p-6">
          <div className="mb-6">
            
            <h1 className="text-2xl font-semibold text-gray-900">
              My Winnings
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View your winnings and upload payment proof.
            </p>
          </div>

          <WinnerCard
            winnings={winnings || []}
            onUpload={handleOpenModal}
          />

          <UploadProofModal
            open={openModal}
            onClose={handleCloseModal}
            onUpload={handleUpload}
          />
        </main>
      </div>
    </div>
  );
};

export default Winnings;