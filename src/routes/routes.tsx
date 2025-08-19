import { Home, Login } from "@/pages";
import { Dashboard } from "@/pages/Dashboard";
import { Routes, Route } from "react-router";
import { PrivateRoutes } from "./privateRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}