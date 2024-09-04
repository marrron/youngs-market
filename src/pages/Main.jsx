import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import iconSoldout from "../assets/images/icon-soldout.svg";
import ImageSlider from "../components/ImageSlider";

export default function Main() {
  const navigate = useNavigate();
  const { products, setProducts, setSelectedProduct } = useProduct();
  const [searchInputValue, setSearchInputValue] = useState("");
  console.log(searchInputValue.length);

  // 상품 전체 불러오기
  const getProducts = () => {
    fetch("https://openmarket.weniv.co.kr/products/")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
        console.log(data.results);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    navigate(`/productdetail/${product.product_id}`);
  };

  const handleSearch = () => {
    if (!searchInputValue.trim()) return;

    fetch(`https://openmarket.weniv.co.kr/products/?search=${searchInputValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("검색 결과:", data.results);
        setProducts(data.results);
      })
      .catch((error) => console.error("검색 요청 실패:", error));
  };

  return (
    <>
      <Header
        setSearchInputValue={setSearchInputValue}
        handleSearch={() => handleSearch()}
      />
      <main>
        <>
          <ImageSlider />
          <ProductsContainerStyle>
            {products.map((product) => (
              <li key={product.product_id} className="product">
                <button
                  className="product-image"
                  type="button"
                  onClick={() => handleProductClick(product)}
                >
                  <img src={product.image} alt="상품이미지" />
                </button>
                <p
                  className="store-name"
                  onClick={() => handleProductClick(product)}
                >
                  {product.store_name}
                </p>
                <strong
                  className="product-name"
                  onClick={() => handleProductClick(product)}
                >
                  {product.product_name}
                </strong>
                {product.stock === 0 && (
                  <img
                    src={iconSoldout}
                    alt="soldout"
                    className="soldout-image"
                  />
                )}
                <p className="product-price">
                  {Number(product.price).toLocaleString()}
                  <span>원</span>
                </p>
              </li>
            ))}
          </ProductsContainerStyle>
        </>
      </main>
      <Footer />
    </>
  );
}

const ProductsContainerStyle = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 49px;
  padding: 80px 300px 180px 300px;

  .product {
    display: flex;
    flex-direction: column;
  }

  .product-image {
    width: 380px;
    height: 380px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    border: 1px solid #c4c4c4;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .store-name {
    color: #767676;
    font-size: 16px;
    padding-top: 16px;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  .product-name {
    color: #000;
    font-size: 18px;
    padding: 10px 0 10px 0;
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }

  .product-price {
    color: #000;
    font-size: 24px;
    font-weight: bold;
  }

  .soldout-image {
    width: 125px;
    padding-bottom: 5px;
  }
`;
