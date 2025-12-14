import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
