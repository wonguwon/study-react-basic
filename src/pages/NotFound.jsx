import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h2>🚫 페이지를 찾을 수 없습니다 (404)</h2>
      <p><code>{location.pathname}</code> 에 해당하는 라우트가 없습니다.</p>
      <button onClick={() => navigate("/")}>홈으로 가기</button>
    </div>
  );
};

export default NotFound;
