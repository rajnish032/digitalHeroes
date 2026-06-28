import { useEffect } from "react";

import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";

import { CharityGrid } from "../../components/Charities/CharityCard";
import { useCharity } from "../../contexts/CharityContext";

const Charity = () => {
  const { charities, getAllCharities } = useCharity();

  useEffect(() => {
    getAllCharities();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 ml-64">
        <Navbar />

        <main className="pt-20 p-6">
          <div className="mb-6">
            

            <h1 className="text-2xl font-semibold text-gray-900">
              Charities
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Browse and support your favourite charities.
            </p>
          </div>

          <CharityGrid charities={charities || []} />
        </main>
      </div>
    </div>
  );
};

export default Charity;