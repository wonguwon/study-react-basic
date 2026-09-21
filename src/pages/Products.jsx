import React from "react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { products } from "../data/products";

const Products = () => {
  // useSearchParams: 쿼리스트링(?category=...)을 읽고 쓰는 훅
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "all";

  const filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div>
      <h2>🛒 상품</h2>
      <p>현재 쿼리스트링: <code>{searchParams.toString() || "(없음)"}</code></p>

      {/* 버튼을 누르면 URL의 쿼리스트링이 바뀌고, 그에 따라 목록이 필터링됨 */}
      <div>
        <button onClick={() => setSearchParams({})}>전체</button>
        <button onClick={() => setSearchParams({ category: "electronics" })}>전자기기</button>
        <button onClick={() => setSearchParams({ category: "clothes" })}>의류</button>
      </div>

      <ul>
        {filtered.map((p) => (
          <li key={p.id}>
            {/* 상대 경로 링크: /products 기준으로 /products/1 이 됨 */}
            <Link to={`${p.id}`}>{p.name}</Link>
          </li>
        ))}
      </ul>

      <hr />
      {/* 중첩 라우트: /products (index) 또는 /products/:id 가 여기에 렌더링됨 */}
      <Outlet />
    </div>
  );
};

export default Products;
