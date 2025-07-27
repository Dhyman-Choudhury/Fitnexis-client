import { Navigate, useLocation } from "react-router" // you’ll add this later
import useAuth from "../hooks/useAuth";
import Loader from "../components/shared/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoutes;
