// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

// Componentes de rotas
import { ProtectedRoutes } from "./context/ProtectedRoutes";

// Páginas da área privada
import DynamicRouterAdmin from "./routes/DynamicRouterAdmin";
// Páginas da área public
import { PublicRoute } from "./context/PublicRouteProps";
// Páginas compartilhadas e públicas
import LoginScreen from "./pages/shared/Login";
import SettingsScreen from "./pages/shared/Settings";
import { WelcomeScreen } from "./pages/shared/Welcome";
import NotFoundScreen from "./pages/shared/NotFound";

// Layout e rotas dinâmicas
import Layout from "./templates/Layout";
import DynamicRouter from "./routes/DynamicRouter";
import { ConfirmationCodeScreen } from "./pages/shared/ConfirmationCode";
import { ThemeProvider } from "./context/ThemeProvider";
import DynamicRouterAdminSecretary from "./routes/DynamicRouterAdminSecretary";
import DynamicRouterAdminAnalysis from "./routes/DynamicRouteranalysis";

// Configurar o Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Routes>
              {/* Rotas públicas */}
              <Route element={<PublicRoute />}>
                <Route element={<Layout />}>
                  <Route path="/" element={<LoginScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                </Route>
                <Route
                  path="/confirmation-code"
                  element={<ConfirmationCodeScreen />}
                />
                <Route
                  path="recover-password/:step"
                  element={<DynamicRouter />}
                />
              </Route>
              {/* Rotas protegidas */}
              <Route element={<ProtectedRoutes />}>
                <Route
                  path="secretary/*"
                  element={<DynamicRouterAdminSecretary />}
                />
                <Route
                  path="analysis/*"
                  element={<DynamicRouterAdminAnalysis />}
                />
                <Route path="admin/*" element={<DynamicRouterAdmin />} />
                <Route path="welcome" element={<WelcomeScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
              </Route>
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
