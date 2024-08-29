import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../context/AuthContext";
import { useProduct } from "../context/ProductContext";
import { useOrder } from "../context/OrderContext";
import { useCartItems } from "../context/CartContext";

export default function PaymentCompleted() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { selectedProduct } = useProduct();
  const { orderkind } = useOrder();
  const { cartItemsIntersection } = useCartItems();
  const [orderList, setOrderList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");

  // direct_order or cart_one_order
  const shippingFee = selectedProduct.shipping_fee.toLocaleString();
  const totalPrice = selectedProduct.price * selectedProduct.quantity;
  const formattedPrice = totalPrice.toLocaleString();

  // cart_order
  const cartOrderTotalShippingFee = cartItemsIntersection.reduce(
    (acc, item) => acc + item.shipping_fee,
    0
  );
  const formattedCartOrderTotalShippingFee =
    cartOrderTotalShippingFee.toLocaleString();
  const cartTotalItemPrice = cartItemsIntersection.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedCartTotalItemPrice = cartTotalItemPrice.toLocaleString();

  // phone number
  const formattedPhoneNumber =
    orderList.receiver_phone_number.slice(0, 3) +
    "-" +
    orderList.receiver_phone_number.slice(3, 7) +
    "-" +
    orderList.receiver_phone_number.slice(7);

  // 주문완료 목록
  const getOrderList = () => {
    fetch("https://openmarket.weniv.co.kr/order/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0]);
        setOrderList(data.results[0]);
      });
  };

  useEffect(() => {
    getOrderList();
  }, []);

  // 결제수단
  useEffect(() => {
    if (orderList.payment_method === "DEPOSIT") {
      setPaymentMethod("무통장 입금");
    } else if (orderList.payment_method === "NAVERPAY") {
      setPaymentMethod("네이버페이 결제");
    } else if (orderList.payment_method === "CARD") {
      setPaymentMethod("신용/체크카드 결제");
    } else if (orderList.payment_method === "KAKAOPAY") {
      setPaymentMethod("카카오페이 결제");
    } else if (orderList.payment_method === "PHONE_PAYMENT") {
      setPaymentMethod("휴대폰 결제");
    }
  }, [orderList.payment_method]);

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
              <strong>{orderList.order_number || "불러오는 중..."}</strong>
            </div>
            <div>
              <span>결제금액</span>
              <strong>
                {orderList.total_price
                  ? `${orderList.total_price.toLocaleString()}원`
                  : "불러오는 중..."}
              </strong>
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
                <p>{paymentMethod}</p>
                <p>
                  입금자: <span>{orderList.buyer || "불러오는 중..."}</span>
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
              <p>{orderList.receiver || "불러오는 중..."}</p>
            </div>
            <div>
              <strong>주소</strong>
              <p>{orderList.address || "불러오는 중..."}</p>
            </div>
            <div>
              <strong>연락처</strong>
              <p>{formattedPhoneNumber || "불러오는 중..."}</p>
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
            {orderkind === "direct_order" || orderkind === "cart_one_order" ? (
              <>
                <OrderItemStyle>
                  <ItemDetailStyle>
                    <button type="button">
                      <img src={selectedProduct.image} alt="상품이미지" />
                    </button>
                    <ItemInfoStyle>
                      <p>{selectedProduct.store_name}</p>
                      <p>{selectedProduct.product_name}</p>
                      <p>수량 : {selectedProduct.quantity}개</p>
                    </ItemInfoStyle>
                  </ItemDetailStyle>
                  <span>-</span>
                  <span>{shippingFee}원</span>
                  <strong>{formattedPrice}원</strong>
                </OrderItemStyle>
              </>
            ) : (
              <>
                {cartItemsIntersection.map((item, index) => {
                  const itemShippingFee = item.shipping_fee.toLocaleString();
                  const itemTotalPrice = item.price * item.quantity;
                  const formattedItemPrice = itemTotalPrice.toLocaleString();

                  return (
                    <OrderItemStyle key={index}>
                      <ItemDetailStyle>
                        <button type="button">
                          <img src={item.image} alt="상품이미지" />
                        </button>
                        <ItemInfoStyle>
                          <p>{item.store_name}</p>
                          <p>{item.product_name}</p>
                          <p>수량 : {item.quantity}개</p>
                        </ItemInfoStyle>
                      </ItemDetailStyle>
                      <span>-</span>
                      <span>{itemShippingFee}원</span>
                      <strong>{formattedItemPrice}원</strong>
                    </OrderItemStyle>
                  );
                })}
              </>
            )}
          </SegmentPlusStyle>
        </PannelAreaStyle>
        <PannelAreaPlusStyle>
          <TitleStyle>
            <h2>결제정보</h2>
          </TitleStyle>
          <SegmentPaymentStyle>
            <div>
              <span>주문상품</span>
              {orderkind === "direct_order" ||
              orderkind === "cart_one_order" ? (
                <strong>{formattedPrice}원</strong>
              ) : (
                <strong>{formattedCartTotalItemPrice}원</strong>
              )}
            </div>
            <div>
              <span>배송비</span>
              {orderkind === "direct_order" ||
              orderkind === "cart_one_order" ? (
                <strong>{shippingFee}원</strong>
              ) : (
                <strong>{formattedCartOrderTotalShippingFee}원</strong>
              )}
            </div>
            <div>
              <span>결제 금액</span>
              <strong>
                {orderList.total_price
                  ? `${orderList.total_price.toLocaleString()}원`
                  : "불러오는 중..."}
              </strong>
            </div>
          </SegmentPaymentStyle>
        </PannelAreaPlusStyle>
        <ButtonAreaStyle>
          <button type="button">주문확인하기</button>
          <button
            type="button"
            onClick={() => {
              navigate("/");
            }}
          >
            쇼핑계속하기
          </button>
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
