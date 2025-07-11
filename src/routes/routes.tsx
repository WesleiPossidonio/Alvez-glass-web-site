import { Home } from "@/pages";
import { Routes, Route } from "react-router";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}