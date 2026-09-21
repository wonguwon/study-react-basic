import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return ( 
    <BrowserRouter>
      <Routes>
        {/* Layout 라우트: 공통 네비게이션, 자식 라우트는 Layout의 <Outlet />에 렌더링 */}
        <Route element={<Layout isLogin={isLogin} onLogout={() => setIsLogin(false)} />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* 동적 세그먼트 (:username) → useParams */}
          <Route path="/profile/:username" element={<Profile />} />

          {/* 중첩 라우트: /products 안에서 index 와 :id 가 <Outlet />으로 바뀜 */}
          <Route path="/products" element={<Products />}>
            <Route index element={<p>상품을 선택하세요.</p>} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>

          {/* 보호 라우트: 로그인 안 했으면 /login 으로 리다이렉트 */}
          <Route
            path="/mypage"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login onLogin={() => setIsLogin(true)} />} />

          {/* 리다이렉트: 옛 주소로 들어오면 새 주소로 보냄 */}
          <Route path="/old-about" element={<Navigate to="/about" replace />} />

          {/* 위 어떤 경로에도 안 맞으면 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
