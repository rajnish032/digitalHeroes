import DashboardContent from "../../components/Dashboard/DashBoardContent";
import Sidebar from "../../components/Dashboard/Sidebar";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
  return (
   <div className="flex min-h-screen bg-gray-50">
  <Sidebar />

  <div className="flex-1 ml-64">
    <Navbar />

    <main className="p-6">
      <DashboardContent />
    </main>
  </div>
</div>
  );
};

export default Dashboard;