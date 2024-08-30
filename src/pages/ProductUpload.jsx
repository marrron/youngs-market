import React, { useState, useRef } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import iconImg from "../assets/images/icon-img.svg";

export default function ProductUpload() {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [shippingFee, setShippingFee] = useState("");
  const [stock, setStock] = useState("");
  const [productInfo, setProductInfo] = useState("");

  console.log(
    productName,
    price,
    shippingMethod,
    shippingFee,
    stock,
    productInfo
  );

  // img업로드 버튼
  const handleImageUploadBtnClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 화면 표시
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 가격 형식
  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // price Input
  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatNumber(rawValue);
    setPrice(formattedValue);
  };

  // shippingfee input
  const handleShippingFeeChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatNumber(rawValue);
    setShippingFee(formattedValue);
  };

  // stock input
  const handleStockChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const formattedValue = formatNumber(rawValue);
    setStock(formattedValue);
  };

  return (
    <>
      <Header />
      <MainStyle>
        <div>
          <h2>상품 등록</h2>
        </div>
        <MainContentStyle>
          <div>
            <h3>*상품 등록 주의사항</h3>
            <div>
              <p>
                <span>- </span>상품 정보 정확성: 상품명, 설명, 가격, 재고 수량
                등 모든 정보는 정확하게 입력하세요.
              </p>
              <p>
                <span>- </span>이미지 품질: 상품 이미지는 고해상도이며, 실제
                상품과 일치해야 합니다.
              </p>
              <p>
                <span>- </span>카테고리 선택: 상품의 특성에 맞는 적절한
                카테고리를 선택하세요.
              </p>
              <p>
                <span>- </span>가격 정책: 시장 가격을 참고하여 경쟁력 있는
                가격을 설정하세요.
              </p>
              <p>
                <span>- </span>배송 정보: 정확한 배송 방법과 배송비를
                명시하세요.
              </p>
              <p>
                <span>- </span>법적 준수: 관련 법규를 준수하고, 금지된 상품은
                등록하지 않도록 주의하세요.
              </p>
            </div>
          </div>
          <div>
            <ProductBasicInfoStyle>
              <li>
                <label>상품 이미지</label>
                <div>
                  {imagePreview ? (
                    <img src={imagePreview} alt="상품 미리보기" />
                  ) : (
                    <button type="button" onClick={handleImageUploadBtnClick}>
                      <img src={iconImg} alt="이미지업로드버튼" />
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                  />
                </div>
              </li>
              <li>
                <label htmlFor="productName">상품명</label>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  maxLength="20"
                />
                <span>{productName.length}/20</span>
              </li>
              <li>
                <label htmlFor="price">판매가</label>
                <input
                  type="text"
                  id="price"
                  value={price}
                  onChange={handlePriceChange}
                />
                <span>원</span>
              </li>
              <li>
                <label>배송방법</label>
                <button
                  type="button"
                  onClick={() => setShippingMethod("PARCEL")}
                >
                  택배,소포,등기
                </button>
                <button
                  type="button"
                  onClick={() => setShippingMethod("DELIVERY")}
                >
                  직접배송(화물배달)
                </button>
              </li>
              <li>
                <label htmlFor="shippingFee">기본 배송비</label>
                <input
                  type="text"
                  value={shippingFee}
                  id="shippingFee"
                  onChange={handleShippingFeeChange}
                />
                <span>원</span>
              </li>
              <li>
                <label htmlFor="stock">재고</label>
                <input
                  type="text"
                  value={stock}
                  id="stock"
                  onChange={handleStockChange}
                />
                <span>개</span>
              </li>
            </ProductBasicInfoStyle>
            <ProductDetailInfoStyle>
              <label htmlFor="productInfo">상품 상세 정보</label>
              <textarea
                value={productInfo}
                id="productInfo"
                onChange={(e) => setProductInfo(e.target.value)}
              ></textarea>
              <p>에디터 영역</p>
              <div>
                <button type="button">취소</button>
                <button type="button">저장하기</button>
              </div>
            </ProductDetailInfoStyle>
          </div>
        </MainContentStyle>
      </MainStyle>
    </>
  );
}

const MainStyle = styled.main`
  padding: 44px 100px 100px 100px;

  > div {
    h2 {
      font-size: 36px;
      font-weight: bold;
    }
  }
`;

const MainContentStyle = styled.div`
  display: grid;
  grid-template-columns: 320px 1300px;
  gap: 80px;
  padding-top: 42px;

  > div {
    &:nth-of-type(1) {
      h3 {
        font-size: 16px;
        color: var(--color-red);
        font-weight: bold;
      }
      > div {
        width: 320px;
        background-color: #ffefe8;
        padding: 20px;
        border-radius: 5px;
        margin-top: 10px;

        p {
          padding-bottom: 17px;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
`;

const ProductBasicInfoStyle = styled.ul`
  display: grid;
  grid-template-columns: 454px 826px;
  grid-template-areas:
    "img productname"
    "img price"
    "img deliverymethod"
    "img deliveryfee"
    "img stock";
  gap: 20px;
  li {
    label {
      font-size: 16px;
      color: var(--color-darkgrey);
      padding-bottom: 10px;
      display: block;
    }

    input {
      background-color: var(--color-lightgrey);
      font-size: 16px;
      border: 1px solid var(--color-orange);
      border-radius: 5px;
      padding: 14.5px 16px;
    }

    &:nth-of-type(1) {
      grid-area: img;

      > div {
        width: 454px;
        height: 454px;
        background-color: var(--color-lightgrey);
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        input {
          display: none;
        }
      }
    }

    &:nth-of-type(2) {
      position: relative;
      input {
        width: 826px;
        padding-right: 70px;
      }

      span {
        color: var(--color-orange);
        font-size: 14px;
        position: absolute;
        top: 50px;
        right: 20px;
      }
    }

    &:nth-of-type(3),
    &:nth-of-type(5),
    &:nth-of-type(6) {
      position: relative;

      input {
        width: 220px;
        padding-right: 65px;
      }

      span {
        position: absolute;
        top: 27px;
        left: 166px;
        color: var(--color-lightgrey);
        background-color: var(--color-orange);
        width: 54px;
        height: 54px;
        text-align: center;
        line-height: 54px;
        border-radius: 0 5px 5px 0;
      }
    }

    &:nth-of-type(4) button {
      width: 220px;
      height: 54px;
      border-radius: 5px;
      font-size: 16px;

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
        margin-left: 10px;

        &:active {
          border: 1px solid var(--color-darkgrey);
          color: var(--color-black);
        }
      }
    }
  }
`;

const ProductDetailInfoStyle = styled.div`
  position: relative;
  label {
    font-size: 16px;
    color: var(--color-darkgrey);
    padding: 40px 0 10px 0;
    display: block;
  }

  textarea {
    width: 1300px;
    height: 700px;
    border-radius: 5px;
    outline: none;
    border: 1px solid var(--color-orange);
    background-color: var(--color-lightgrey);
    resize: none;
    padding: 16px;
  }

  p {
    color: var(--color-orange);
    font-size: 48px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
  }

  > div {
    padding-top: 50px;
    text-align: end;

    button {
      width: 200px;
      height: 60px;
      border-radius: 5px;
      font-size: 18px;

      &:nth-of-type(1) {
        border: 1px solid var(--color-orange);
        color: var(--color-darkgrey);
        background-color: var(--color-lightgrey);

        &:active {
          border: 1px solid var(--color-darkgrey);
          color: var(--color-black);
        }
      }

      &:nth-of-type(2) {
        color: var(--color-bg);
        background-color: var(--color-maroon);
        margin-left: 14px;

        &:active {
          background-color: var(--color-orange);
        }
      }
    }
  }
`;
