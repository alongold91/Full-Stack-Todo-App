import { Navigate } from "react-router";

interface ProtectedRouteProps {
  condition: boolean;
  alternativeRoute: string;
  children: React.ReactNode;
}

function ProtectedRoute({ children, condition, alternativeRoute }: ProtectedRouteProps) {
  if (!condition) {
    return <Navigate to={alternativeRoute} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
