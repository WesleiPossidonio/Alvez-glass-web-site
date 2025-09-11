import { Home, LoginClient } from "@/pages";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./privateRoutes";
import { Dashboard } from "@/pages/Dashboard";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginClient />} />

      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}