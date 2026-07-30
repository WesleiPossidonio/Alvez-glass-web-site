
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "@/hooks/authSession";
import { SplinePointerIcon } from "lucide-react";
export const PrivateRoutesClients = () => {
  const { loading, authenticated, role } = useAuth();

  if (loading) {
    <SplinePointerIcon />
  }

  if (!authenticated || role !== "client") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
