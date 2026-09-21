import React from "react";
import { Link, useLocation } from "react-router-dom";

const About = () => {
  // useLocation: 현재 URL 정보 (pathname, search, hash, state)
  const location = useLocation();

  return (
    <div>
      <h2>ℹ️ 소개</h2>
      <p>useLocation 으로 읽은 현재 위치 정보입니다.</p>
      <ul>
        <li>pathname: <code>{location.pathname}</code></li>
        <li>search: <code>{location.search || "(없음)"}</code></li>
        <li>hash: <code>{location.hash || "(없음)"}</code></li>
        <li>state: <code>{location.state ? JSON.stringify(location.state) : "(없음)"}</code></li>
      </ul>
      <p>
        {/* Link의 state로 데이터를 넘기면 다음 페이지에서 location.state로 받을 수 있음 */}
        <Link to="/about?tab=team#top" state={{ from: "About 페이지 링크" }}>
          쿼리스트링 + 해시 + state 붙여서 다시 열기
        </Link>
      </p>
    </div>
  );
};

export default About;
