// PrivateRoute.js (Protect routes)
import { Navigate } from "react-router-dom"; // Navigate for redirection
import { useAuth } from "./AuthContext"; // Use Auth context

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get authentication status

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // If authenticated, render children (CreateTrip)
};

export default PrivateRoute;
