import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function PublicRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (location.pathname.includes("confirmation-code")) {
    return <Outlet />;
  }

  const lastPath = localStorage.getItem("lastPath") || "/user/home";
  return isAuthenticated ? (
    <Navigate to={lastPath} replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
