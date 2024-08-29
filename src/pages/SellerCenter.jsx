import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import iconPlus from "../assets/images/icon-plus.svg";

export default function SellerCenter() {
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
              <li>
                <Link>판매중인 상품(3)</Link>
              </li>
              <li>
                <Link>주문/배송</Link>
                <span>2</span>
              </li>
              <li>
                <Link>문의/리뷰</Link>
                <span>1</span>
              </li>
              <li>
                <Link>통계</Link>
                <span>1</span>
              </li>
              <li>
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
              <li>
                <img
                  src="https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.56.21.png"
                  alt=""
                />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <span>재고 : 370개</span>
                </div>
                <strong>17,500원</strong>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </li>
              <li>
                <img
                  src="https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.56.21.png"
                  alt=""
                />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <span>재고 : 370개</span>
                </div>
                <strong>17,500원</strong>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </li>
              <li>
                <img
                  src="https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-24_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_11.56.21.png"
                  alt=""
                />
                <div>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <span>재고 : 370개</span>
                </div>
                <strong>17,500원</strong>
                <button type="button">수정</button>
                <button type="button">삭제</button>
              </li>
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
  grid-template-columns: 250px 1400px;
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
