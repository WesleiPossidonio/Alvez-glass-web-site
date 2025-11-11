import { Home, LoginClient, UpdatePassword } from "@/pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";

import { PrivateRoutesClients } from "./privateRoutesClients";
import { DashboardClient } from "@/pages/DashboardClient";
import { AdminDashboard } from "@/pages/AdminDashboard/index.";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginClient />} />
      <Route path="/admin" element={<UpdatePassword />} />
      <Route path="/cadastrar-senha" element={<UpdatePassword />} />

      <Route path="/dashboard-client" element={<PrivateRoutesClients />}>
        <Route index element={<DashboardClient />} />
      </Route>

      <Route path="/dashboard-admin" element={<PrivateRoutes />} >
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}