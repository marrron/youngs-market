import React from "react";
import Header from "../components/Header";
import styled from "styled-components";
import iconOrder from "../assets/images/icon-order.svg";
import notebookShape from "../assets/images/notebook-shape.svg";
import {
  InfoTxtStyle,
  OrderItemStyle,
  ItemDetailStyle,
  ItemInfoStyle,
} from "../pages/Order";

export default function PaymentCompleted() {
  return (
    <>
      <Header />
      <MainStyle>
        <h1>주문완료</h1>
        <ResultAreaStyle>
          <p>
            <img src={iconOrder} alt="" />
            <strong>
              고객님의 주문이 <br />
              정상적으로 완료되었습니다.
            </strong>
          </p>
          <div>
            <div>
              <span>주문번호</span>
              <strong>182</strong>
            </div>
            <div>
              <span>결제금액</span>
              <strong>46,500원</strong>
            </div>
          </div>
        </ResultAreaStyle>
        <PannelAreaStyle>
          <TitleStyle>
            <h2>결제수단</h2>
          </TitleStyle>
          <SegmentStyle>
            <div>
              <strong>결제수단</strong>
              <div>
                <p>무통장 입금</p>
                <p>
                  입금자: <span>김어쩌구</span>
                </p>
              </div>
            </div>
          </SegmentStyle>
        </PannelAreaStyle>
        <PannelAreaStyle>
          <TitleStyle>
            <h2>배송지</h2>
          </TitleStyle>
          <SegmentStyle>
            <div>
              <strong>받는사람</strong>
              <p>김어쩌구</p>
            </div>
            <div>
              <strong>주소</strong>
              <p>13529 경기 성남시 분당구 판교역로 166 101동 101호</p>
            </div>
            <div>
              <strong>연락처</strong>
              <p>010-1346-1346</p>
            </div>
          </SegmentStyle>
        </PannelAreaStyle>
        <PannelAreaStyle>
          <TitleStyle>
            <h2>주문상품</h2>
          </TitleStyle>
          <SegmentPlusStyle>
            <InfoTxtPlusStyle>
              <span>결제정보</span>
              <span>할인</span>
              <span>배송비</span>
              <span>결제금액</span>
            </InfoTxtPlusStyle>
            <OrderItemStyle>
              <ItemDetailStyle>
                <button type="button">
                  <img
                    src="https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.00.39_wWpDrY7.png"
                    alt="상품이미지"
                  />
                </button>
                <ItemInfoStyle>
                  <p>백엔드글로벌</p>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>수량 : 1개</p>
                </ItemInfoStyle>
              </ItemDetailStyle>
              <span>-</span>
              <span>무료배송</span>
              <strong>46,500원</strong>
            </OrderItemStyle>
            <OrderItemStyle>
              <ItemDetailStyle>
                <button type="button">
                  <img
                    src="https://openmarket.weniv.co.kr/media/products/2024/06/25/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-06-25_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.00.39_wWpDrY7.png"
                    alt="상품이미지"
                  />
                </button>
                <ItemInfoStyle>
                  <p>백엔드글로벌</p>
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>수량 : 1개</p>
                </ItemInfoStyle>
              </ItemDetailStyle>
              <span>-</span>
              <span>무료배송</span>
              <strong>46,500원</strong>
            </OrderItemStyle>
          </SegmentPlusStyle>
        </PannelAreaStyle>
        <PannelAreaPlusStyle>
          <TitleStyle>
            <h2>결제정보</h2>
          </TitleStyle>
          <SegmentPaymentStyle>
            <div>
              <span>주문상품</span>
              <strong>46,500원</strong>
            </div>
            <div>
              <span>배송비</span>
              <strong>0원</strong>
            </div>
            <div>
              <span>결제 금액</span>
              <strong>46,500원</strong>
            </div>
          </SegmentPaymentStyle>
        </PannelAreaPlusStyle>
        <ButtonAreaStyle>
          <button type="button">주문확인하기</button>
          <button type="button">쇼핑계속하기</button>
        </ButtonAreaStyle>
      </MainStyle>
    </>
  );
}

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;

  h1 {
    width: 1280px;
    text-align: center;
    margin: 56px 0 47px 0;
    background-color: var(--color-orange);
    color: var(--color-lightgrey);
    font-size: 36px;
    padding: 10px 0;
    border-radius: 5px;
  }
`;

const ResultAreaStyle = styled.div`
  position: relative;
  width: 1280px;
  padding: 30px 40px 40px 40px;
  background-color: var(--color-lightgrey);

  > p {
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 2px dashed var(--color-maroon);

    img {
      display: block;
      margin: 0 auto 13px auto;
    }
  }

  > div {
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    font-size: 20px;

    > div {
      display: flex;
      justify-content: space-between;
      strong {
        color: var(--color-maroon);
        font-weight: bold;
      }
    }
  }

  &::after {
    position: absolute;
    content: "";
    background: url(${notebookShape}) no-repeat;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 1280px;
    height: 4px;
  }
`;

const PannelAreaStyle = styled.div`
  width: 1280px;
  border-bottom: 18px solid var(--color-orange);
`;

const TitleStyle = styled.div`
  padding: 44px 0 17px 0;
  border-bottom: 2px solid var(--color-orange);
  font-size: 24px;
  font-weight: bold;
`;

const SegmentStyle = styled.div`
  > div {
    display: flex;
    gap: 60px;
    padding: 18px 0 28px 0;
    border-bottom: 1px solid var(--color-orange);

    strong {
      color: var(--color-darkgrey);
      min-width: 80px;
    }

    > div {
      line-height: 21px;
    }
  }
`;

const SegmentPlusStyle = styled.div`
  padding: 28px 0 44px 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const PannelAreaPlusStyle = styled(PannelAreaStyle)`
  border-bottom: none;
`;

const SegmentPaymentStyle = styled.div`
  padding-top: 40px;
  font-size: 20px;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 46px;

    &:nth-of-type(1),
    &:nth-of-type(2) {
      span {
        color: var(--color-darkgrey);
      }
    }

    &:nth-of-type(2) {
      margin: 22px 0 40px 0;
    }

    &:nth-of-type(3) {
      background-color: var(--color-maroon);
      height: 55px;
      border-radius: 5px;
      color: var(--color-lightgrey);
      font-size: 24px;
    }
  }
`;

const InfoTxtPlusStyle = styled(InfoTxtStyle)`
  margin-bottom: 0;
`;

const ButtonAreaStyle = styled.div`
  display: flex;
  gap: 28px;
  padding-top: 110px;

  button {
    width: 626px;
    height: 55px;
    border-radius: 5px;
    font-size: 24px;

    &:nth-of-type(1) {
      background-color: var(--color-lightgrey);
      color: var(--color-darkgrey);
    }

    &:nth-of-type(2) {
      background-color: var(--color-orange);
      color: var(--color-lightgrey);
    }
  }
`;
