import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ isSignedIn, setIsSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return React.cloneElement(children, { setIsSignedIn });
}
export default Protected;
