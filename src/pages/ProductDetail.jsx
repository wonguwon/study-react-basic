import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // useParams 값은 항상 문자열이므로 숫자로 변환해서 비교
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p>id가 {id}인 상품이 없습니다.</p>;
  }

  return (
    <div>
      <h3>상품 상세 (id: {id})</h3>
      <p>이름: {product.name}</p>
      <p>가격: {product.price.toLocaleString()}원</p>

      {/* navigate(-1): 브라우저 뒤로가기와 동일 */}
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      {/* 상위 경로로 이동 */}
      <button onClick={() => navigate("/products")}>목록으로</button>
    </div>
  );
};

export default ProductDetail;
