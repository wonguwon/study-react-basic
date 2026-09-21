import React from "react";
import { Link } from "react-router-dom";

// 기능별 데모 페이지 목록
const demos = [
  { to: "/about", title: "소개", desc: "useLocation - 현재 경로 정보 읽기" },
  { to: "/profile/kim", title: "프로필", desc: "useParams - URL 파라미터 (:username)" },
  { to: "/products", title: "상품", desc: "useSearchParams - 쿼리스트링 / 중첩 라우트 + Outlet" },
  { to: "/mypage", title: "마이페이지", desc: "보호 라우트 - 로그인 안 하면 /login 으로 Navigate" },
  { to: "/old-about", title: "옛날 소개 주소", desc: "Navigate 컴포넌트 - /old-about → /about 리다이렉트" },
  { to: "/없는페이지", title: "없는 페이지", desc: "path=\"*\" - 404 처리 + useNavigate" },
];

const Home = () => {
  return (
    <div>
      <h2>🏠 홈</h2>
      <p>메뉴 또는 아래 링크를 눌러 각 기능을 확인해보세요.</p>
      <ul>
        {demos.map((demo) => (
          <li key={demo.to} style={{ marginBottom: 8 }}>
            <Link to={demo.to}>{demo.title}</Link> - {demo.desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
