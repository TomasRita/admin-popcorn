import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/TopBar";
import Settings from "@/pages/shared/Settings";
import NotFoundScreen from "@/pages/shared/NotFound";
import PerfilEmpresa from "@/pages/platform/users/secretary/PerfilStartup";
import NotificacoesPage from "@/pages/shared/NotificacoesPage";
import DashboardFull from "@/pages/platform/users/analysis/DashboardAnalysis";
import FranchisesPage from "@/pages/platform/users/adminPrincipal/FranchisesPage";
import StartupsPage from "@/pages/platform/users/adminPrincipal/StartupsPage";

const DynamicRouterAdminAnalysis: React.FC = () => {
  const location = useLocation();

  // Lista das rotas válidas dentro de /admin/
  const validRoutes = [
    "/analysis/dashboard",
    "/analysis/startups",
    "/analysis/franchise",
    "/analysis/users",
    "/analysis/contact",
    "/analysis/settings",
    "/analysis/notifications",
  ];

  const { pathname } = location;

  const isInstitutionRoute = pathname.startsWith("/analysis/startup/profile/");

  const isValidFixedRoute = validRoutes.includes(pathname);

  if (!isValidFixedRoute && !isInstitutionRoute) {
    return <NotFoundScreen />;
  }

  return (
    <div className="flex h-screen dark:bg-gray-800">
      {/* Sidebar fixo para o Admin */}
      <Sidebar role="analysis" />

      {/* Área de conteúdo com TopBar */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<DashboardFull />} />
            <Route path="startups" element={<StartupsPage />} />
            <Route path="startup/profile/:name" element={<PerfilEmpresa />} />
            <Route path="franchise" element={<FranchisesPage />} />
            <Route path="notifications" element={<NotificacoesPage />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DynamicRouterAdminAnalysis;
