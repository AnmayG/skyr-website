import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { auth } from "../../firebase";

function RequireAuth({ children }) {
  let location = useLocation();
  if (auth.currentUser === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
