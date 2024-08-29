import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import iconPlus from "../assets/images/icon-plus.svg";
import { useAuth } from "../context/AuthContext";

export default function SellerCenter() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [activeNavItem, setActiveNavItem] = useState("판매중인 상품");

  // navbar
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  // 판매상품 목록 GET
  const getProducts = () => {
    fetch("https://openmarket.weniv.co.kr/seller/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setProducts(data.results);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <MainStyle>
        <LogoBoxStyle>
          <div>
            <h2>대시보드</h2>
            <strong>백엔드글로벌</strong>
          </div>
          <button type="button">
            <img src={iconPlus} alt="상품등록버튼" />
            상품 업로드
          </button>
        </LogoBoxStyle>
        <MainContentStyle>
          <nav>
            <ul>
              <li
                className={activeNavItem === "판매중인 상품" ? "active" : ""}
                onClick={() => handleNavItemClick("판매중인 상품")}
              >
                <Link>판매중인 상품({products.length})</Link>
              </li>
              <li
                className={activeNavItem === "주문/배송" ? "active" : ""}
                onClick={() => handleNavItemClick("주문/배송")}
              >
                <Link>주문/배송</Link>
                <span>2</span>
              </li>
              <li
                className={activeNavItem === "문의/리뷰" ? "active" : ""}
                onClick={() => handleNavItemClick("문의/리뷰")}
              >
                <Link>문의/리뷰</Link>
                <span>1</span>
              </li>
              <li
                className={activeNavItem === "통계" ? "active" : ""}
                onClick={() => handleNavItemClick("통계")}
              >
                <Link>통계</Link>
                <span>1</span>
              </li>
              <li
                className={activeNavItem === "스토어 설정" ? "active" : ""}
                onClick={() => handleNavItemClick("스토어 설정")}
              >
                <Link>스토어 설정</Link>
              </li>
            </ul>
          </nav>
          <SalesProductsBoxStyle>
            <div>
              <span>상품정보</span>
              <span>판매가격</span>
              <span>수정</span>
              <span>삭제</span>
            </div>
            <ul>
              {products.map((product, index) => {
                return (
                  <li key={index}>
                    <img src={product.image} alt="" />
                    <div>
                      <p>{product.product_name}</p>
                      <span>재고 : {product.stock}개</span>
                    </div>
                    <strong>{product.price.toLocaleString()}원</strong>
                    <button type="button">수정</button>
                    <button type="button">삭제</button>
                  </li>
                );
              })}
            </ul>
          </SalesProductsBoxStyle>
        </MainContentStyle>
      </MainStyle>
    </>
  );
}

const MainStyle = styled.main`
  padding: 44px 100px 96px 100px;
`;

const LogoBoxStyle = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 16px;
    font-size: 36px;
    font-weight: bold;

    strong {
      color: var(--color-maroon);
    }
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 168px;
    height: 54px;
    background-color: var(--color-maroon);
    border-radius: 5px;
    color: var(--color-bg);
    font-size: 18px;

    &:active {
      background-color: var(--color-orange);
    }
  }
`;

const MainContentStyle = styled.div`
  display: grid;
  grid-template-columns: 250px 1422px;
  gap: 30px;
  padding-top: 42px;

  > nav {
    ul {
      font-size: 16px;
      font-weight: bold;

      li {
        padding: 15px 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;

        &.active {
          background-color: var(--color-maroon);
          color: var(--color-bg);
          border-radius: 5px;
        }

        &:active {
          background-color: var(--color-orange);
          color: var(--color-bg);
          border-radius: 5px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }
      }

      span {
        color: var(--color-bg);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--color-red);
        text-align: center;
        line-height: 18px;
        font-size: 12px;
      }
    }
  }
`;

const SalesProductsBoxStyle = styled.div`
  border: 1px solid var(--color-orange);
  border-radius: 5px;
  margin-bottom: 96px;

  overflow: hidden;

  > div {
    display: grid;
    grid-template-columns: 5.5fr 2.5fr 1fr 1fr;
    justify-items: center;
    border-bottom: 1px solid var(--color-orange);

    span {
      font-size: 18px;
      padding: 18px 0;
    }
  }

  > ul {
    background-color: #f2f2f2;
    min-height: 830px;

    li {
      display: grid;
      grid-template-columns: 1fr 4.5fr 2.5fr 1fr 1fr;
      background-color: var(--color-bg);
      padding: 17px 0;
      border-bottom: 1px solid var(--color-orange);

      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }

      strong {
        font-size: 18px;
        color: #000;
        font-weight: bold;
      }

      img,
      strong,
      button {
        justify-self: center;
        align-self: center;
      }

      button {
        width: 80px;
        height: 40px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;

        &:nth-of-type(1) {
          background-color: var(--color-maroon);
          color: var(--color-bg);

          &:active {
            background-color: var(--color-orange);
          }
        }

        &:nth-of-type(2) {
          background-color: var(--color-lightgrey);
          color: var(--color-darkgrey);
          border: 1px solid var(--color-orange);

          &:active {
            border: 1px solid var(--color-darkgrey);
            color: var(--color-black);
          }
        }
      }

      > div {
        padding: 10px 0;

        p {
          font-size: 18px;
          color: var(--color-black);
          padding-bottom: 10px;
        }

        span {
          font-size: 16px;
          color: var(--color-darkgrey);
        }
      }
    }
  }
`;
