import { useEffect } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";
import DrawCard from "../../components/DrawCard";

import { useDraw } from "../../contexts/DrawContext";

const Draw = () => {
  const {
    latestDraw,
    draws,
    getLatestDraw,
    getAllDraws,
  } = useDraw();

  useEffect(() => {
    getLatestDraw();
    getAllDraws();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 p-6">

          <DrawCard
            latestDraw={latestDraw}
            draws={draws || []}
          />
        </main>
      </div>
    </div>
  );
};

export default Draw;