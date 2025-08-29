import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/TopBar";
import Settings from "@/pages/shared/Settings";
import NotFoundScreen from "@/pages/shared/NotFound";
import AdminDashboardScreen from "@/pages/platform/users/adminPrincipal/Dashboard";
import FranchisesPage from "@/pages/platform/users/adminPrincipal/FranchisesPage";
import StartupsPage from "@/pages/platform/users/adminPrincipal/StartupsPage";
import PerfilEmpresa from "@/pages/platform/users/secretary/PerfilStartup";

const DynamicRouterAdmin: React.FC = () => {
  const location = useLocation();

  // Lista das rotas válidas dentro de /admin/
  const validRoutes = [
    "/admin/dashboard",
    "/admin/franchise",
    "/admin/startups",
    "/admin/contact",
    "/admin/settings",
  ];

  const { pathname } = location;

  const isInstitutionRoute = pathname.startsWith("/admin/startup/profile/");

  const isValidFixedRoute = validRoutes.includes(pathname);

  if (!isValidFixedRoute && !isInstitutionRoute) {
    return <NotFoundScreen />;
  }
  return (
    <div className="flex h-screen dark:bg-gray-800">
      {/* Sidebar fixo para o Admin */}
      <Sidebar role="admin" />

      {/* Área de conteúdo com TopBar */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<AdminDashboardScreen />} />
            <Route path="startups" element={<StartupsPage />} />
            <Route path="startup/profile/:name" element={<PerfilEmpresa />} />
            <Route path="franchise" element={<FranchisesPage />} />
  
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DynamicRouterAdmin;
