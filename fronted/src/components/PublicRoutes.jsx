import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, authLoading } = useSelector(
    (state) => state.userReducer,
  );

  if (authLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="animate-pulse">Verifying session...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default PublicRoutes;
