import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
 
interface ProtectedRouteProps {
  allowedRole: "candidate" | "employer" | "admin";
  children: ReactNode;
}
 
const ProtectedRoute = ({ allowedRole, children }: ProtectedRouteProps) => {
  const role = localStorage.getItem("role");
 
  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }
 
  return <>{children}</>;
};
 
export default ProtectedRoute;