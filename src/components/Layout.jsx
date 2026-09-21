import React from "react";
import { NavLink, Outlet } from "react-router-dom";

// NavLink: 현재 경로와 일치하면 isActive가 true → 활성 메뉴 스타일 적용
const navStyle = ({ isActive }) => ({
  marginRight: 12,
  fontWeight: isActive ? "bold" : "normal",
  color: isActive ? "#e03131" : "#646cff",
});

const Layout = ({ isLogin, onLogout }) => {
  return (
    <div>
      <nav style={{ paddingBottom: 12, borderBottom: "1px solid #ddd" }}>
        {/* end: "/"는 모든 경로의 접두사이므로 정확히 일치할 때만 활성화 */}
        <NavLink to="/" style={navStyle} end>홈</NavLink>
        <NavLink to="/about" style={navStyle}>소개</NavLink>
        <NavLink to="/profile/kim" style={navStyle}>프로필</NavLink>
        <NavLink to="/products" style={navStyle}>상품</NavLink>
        <NavLink to="/mypage" style={navStyle}>마이페이지</NavLink>
        {isLogin ? (
          <button onClick={onLogout}>로그아웃</button>
        ) : (
          <NavLink to="/login" style={navStyle}>로그인</NavLink>
        )}
      </nav>

      {/* Outlet: 자식 라우트의 element가 이 자리에 렌더링됨 */}
      <Outlet />
    </div>
  );
};

export default Layout;
