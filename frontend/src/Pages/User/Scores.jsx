import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";

import ScoreForm from "../../components/ScoreForm";
import ScoreTable from "../../components/ScoreTable";

import { useScore } from "../../contexts/ScoreContext";

const Scores = () => {
  const { getScores } = useScore();

  const [openForm, setOpenForm] = useState(false);
  const [editScore, setEditScore] = useState(null);

  useEffect(() => {
    getScores();
  }, []);

  const handleAdd = () => {
    setEditScore(null);
    setOpenForm(true);
  };

  const handleEdit = (score) => {
    setEditScore(score);
    setOpenForm(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-1">
                Dashboard
              </p>

              <h1 className="text-2xl font-semibold text-gray-900">
                Golf Scores
              </h1>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              Add Score
            </button>
          </div>

          {/* Scores Table */}
          <ScoreTable onEdit={handleEdit} />

          {/* Modal */}
          <ScoreForm
            open={openForm}
            onClose={() => setOpenForm(false)}
            editData={editScore}
          />
        </main>
      </div>
    </div>
  );
};

export default Scores;