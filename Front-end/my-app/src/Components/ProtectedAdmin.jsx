import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedAdmin({ isAdmin, setIsAdmin, children }) {
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return React.cloneElement(children, { setIsAdmin });
}
export default ProtectedAdmin;
