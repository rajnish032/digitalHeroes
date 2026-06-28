import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";

import ProtectedAuth from "./components/Protected/ProtectedAuth";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import AdminRoute from "./components/Protected/AdminRoute";

import { AuthProvider } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { CharityProvider } from "./contexts/CharityContext";
import { ScoreProvider } from "./contexts/ScoreContext";
import { DrawProvider } from "./contexts/DrawContext";
import { WinnerProvider } from "./contexts/WinnerContext";

import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminUsers from "./Pages/Admin/AdminUsers";
import AdminCharities from "./Pages/Admin/AdminCharities";
import AdminDraws from "./Pages/Admin/AdminDraws";
import AdminWinners from "./Pages/Admin/AdminWinners";

import Subscription from "./Pages/User/Subscription";
import Charity from "./Pages/User/Charitty";
import Scores from "./Pages/User/Scores";
import Dashboard from "./Pages/User/Dashboard";
import Draw from "./Pages/User/Draw";
import Winnings from "./Pages/User/Winnings";

function App() {
  return (
    <Router>
      <AuthProvider>
        <DashboardProvider>
          <SubscriptionProvider>
            <CharityProvider>
              <ScoreProvider>
                <DrawProvider>
                  <WinnerProvider>
                    <Routes>
                      <Route path="/" element={<Home />} />

                      <Route element={<ProtectedAuth />}>
                        <Route path="/auth/signup" element={<Signup />} />
                        <Route path="/auth/verify" element={<Verify />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route
                          path="/auth/forgot-password"
                          element={<ForgotPassword />}
                        />
                        <Route
                          path="/auth/reset-password"
                          element={<ResetPassword />}
                        />
                      </Route>

                      <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route
                          path="/subscription"
                          element={<Subscription />}
                        />
                        <Route path="/charities" element={<Charity />} />
                        <Route path="/scores" element={<Scores />} />
                        <Route path="/draw" element={<Draw />} />
                        <Route path="/winnings" element={<Winnings />} />
                      </Route>

                      <Route element={<AdminRoute />}>
                        <Route
                          path="/admin/dashboard"
                          element={<AdminDashboard />}
                        />

                        <Route path="/admin/users" element={<AdminUsers />} />

                        <Route
                          path="/admin/charities"
                          element={<AdminCharities />}
                        />

                        <Route path="/admin/draws" element={<AdminDraws />} />

                        <Route
                          path="/admin/winners"
                          element={<AdminWinners />}
                        />

                        
                      </Route>
                    </Routes>
                  </WinnerProvider>
                </DrawProvider>
              </ScoreProvider>
            </CharityProvider>
          </SubscriptionProvider>
        </DashboardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
