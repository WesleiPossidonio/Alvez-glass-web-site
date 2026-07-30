import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/authSession";
import { SplinePointerIcon } from "lucide-react";

export const PrivateRoutes = () => {
  const { loading, authenticated, role } = useAuth();

  if (loading) {
    <SplinePointerIcon />
  }

  if (!authenticated || role !== "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};