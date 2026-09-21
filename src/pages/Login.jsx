import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute에서 넘겨준 원래 목적지 (없으면 홈)
  const from = location.state?.from ?? "/";

  const handleLogin = () => {
    onLogin();
    // replace: true → 히스토리에서 로그인 페이지를 지우고 이동 (뒤로가기 시 로그인 페이지로 안 돌아옴)
    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>🔐 로그인</h2>
      <p>로그인 후 이동할 경로: <code>{from}</code></p>
      <button onClick={handleLogin}>로그인하기</button>
    </div>
  );
};

export default Login;
