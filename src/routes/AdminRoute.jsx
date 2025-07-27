import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import Loader from "../components/shared/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [role, roleLoading] = useUserRole();
  const location = useLocation();

  if (authLoading || roleLoading) return <Loader />;

  if (user && role === "admin") return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
