import { Navigate } from "react-router-dom";

function ProtectedRoute({ currentUser, children }) {
  return currentUser ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
