import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  const state = Object.values({ user }).toString();
  console.log(state);

  if (user.length === 0) {
    return <Navigate to="/login" />;
  }
  return { user } ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
