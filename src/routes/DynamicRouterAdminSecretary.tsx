import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/TopBar";
import Settings from "@/pages/shared/Settings";
import NotFoundScreen from "@/pages/shared/NotFound";
import NotificacoesPage from "@/pages/shared/NotificacoesPage";
import Dashboard from "@/pages/platform/users/secretary/DashboardSecretary";
import RecebidasPage from "@/pages/platform/users/secretary/RecebidasPage";
import PerfilEmpresa from "@/pages/platform/users/secretary/PerfilStartup";
import MensagensPage from "@/pages/platform/users/secretary/MensagensPage";
import DocumentosPage from "@/pages/platform/users/secretary/DocumentosPage";
import DocumentProfilePage from "@/pages/platform/users/secretary/DocumentProfilePage";
import TarefasPage from "@/pages/platform/users/secretary/TarefasPage";

const DynamicRouterAdminSecretary: React.FC = () => {
  const location = useLocation();

  // Lista das rotas válidas dentro de /admin/
  const validRoutes = [
    "/secretary/dashboard",
    "/secretary/inbox",
    "/secretary/messages",
    "/secretary/documents",
    "/secretary/tasks",
    "/secretary/settings",
    "/secretary/notifications",
  ];

  const { pathname } = location;

  const isInstitutionRoute =
    pathname.startsWith("/secretary/startup/profile/") ||
    pathname.startsWith("/secretary/documents/profile/");

  const isValidFixedRoute = validRoutes.includes(pathname);

  if (!isValidFixedRoute && !isInstitutionRoute) {
    return <NotFoundScreen />;
  }
  return (
    <div className="flex h-screen dark:bg-gray-800">
      {/* Sidebar fixo para o Admin */}
      <Sidebar role="secretary" />

      {/* Área de conteúdo com TopBar */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inbox" element={<RecebidasPage />} />
            <Route path="tasks" element={<TarefasPage />} />
            <Route path="messages" element={<MensagensPage />} />

            <Route
              path="documents/profile/:name"
              element={<DocumentProfilePage />}
            />
            <Route path="documents" element={<DocumentosPage />} />
            <Route path="startup/profile/:name" element={<PerfilEmpresa />} />
            <Route path="notifications" element={<NotificacoesPage />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DynamicRouterAdminSecretary;
