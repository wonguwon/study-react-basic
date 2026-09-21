import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 로그인하지 않았으면 /login 으로 보내고, 원래 가려던 경로를 state에 담아 전달
const ProtectedRoute = ({ isLogin, children }) => {
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
