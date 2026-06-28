import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSubscription } from "../../contexts/SubscriptionContext";

const ProtectedAuth = () => {
  const { user } = useAuth();
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return (
      <Navigate
        to={subscription ? "/dashboard" : "/"}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedAuth;