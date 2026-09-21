import React from "react";
import { Link, useParams } from "react-router-dom";

const users = {
  kim: { name: "김개똥", job: "프론트엔드 개발자" },
  lee: { name: "이몽룡", job: "백엔드 개발자" },
  park: { name: "박보검", job: "디자이너" },
};

const Profile = () => {
  // useParams: 라우트 경로의 :username 부분을 객체로 받음
  const { username } = useParams();
  const user = users[username];

  return (
    <div>
      <h2>👤 프로필</h2>
      <p>URL 파라미터 username: <code>{username}</code></p>

      {user ? (
        <p>{user.name} / {user.job}</p>
      ) : (
        <p>존재하지 않는 사용자입니다.</p>
      )}

      <p>
        {Object.keys(users).map((id) => (
          <Link key={id} to={`/profile/${id}`} style={{ marginRight: 12 }}>
            /profile/{id}
          </Link>
        ))}
        <Link to="/profile/unknown">/profile/unknown</Link>
      </p>
    </div>
  );
};

export default Profile;
