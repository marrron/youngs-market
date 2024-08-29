import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import iconCheck from "../assets/images/icon-check-box.svg";
import iconCheckFill from "../assets/images/icon-check-fill-box.svg";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { useProduct } from "../context/ProductContext";
import { useCartItems } from "../context/CartContext";

export default function Order() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { selectedProduct } = useProduct();
  const { orderkind } = useOrder();
  const { cartItemsIntersection } = useCartItems();

  const [ordererName, setOrdererName] = useState("");
  const [ordererPhone, setOrdererPhone] = useState({
    part1: "",
    part2: "",
    part3: "",
  });
  const [ordererEmail, setOrdererEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState({
    part1: "",
    part2: "",
    part3: "",
  });
  const [address, setAddress] = useState({ zip: "", street: "", detail: "" });
  const [deliveryMessage, setDeliveryMessage] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  console.log(
    ordererName,
    ordererPhone,
    ordererEmail,
    recipientName,
    recipientPhone,
    address,
    deliveryMessage,
    selectedPaymentMethod,
    isAgree
  );

  // 모든 입력값이 작성
  useEffect(() => {
    const checkCompletion = () => {
      if (
        ordererName &&
        ordererPhone.part1 &&
        ordererPhone.part2 &&
        ordererPhone.part3 &&
        ordererEmail &&
        recipientName &&
        recipientPhone.part1 &&
        recipientPhone.part2 &&
        recipientPhone.part3 &&
        address.zip &&
        address.street &&
        address.detail &&
        deliveryMessage &&
        selectedPaymentMethod
      ) {
        setIsCompleted(true);
      } else {
        setIsCompleted(false);
      }
    };

    checkCompletion();
  }, [
    ordererName,
    ordererPhone,
    ordererEmail,
    recipientName,
    recipientPhone,
    address,
    deliveryMessage,
    selectedPaymentMethod,
  ]);

  // direct_order or cart_one_order
  const shippingFee = selectedProduct.shipping_fee.toLocaleString();
  const totalPrice = selectedProduct.price * selectedProduct.quantity;
  const formattedPrice = totalPrice.toLocaleString();
  const finalTotalPrice =
    selectedProduct.quantity * selectedProduct.price +
    selectedProduct.shipping_fee;
  const formattedFinalTotalPrice = finalTotalPrice.toLocaleString();

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
  const cartFinalTotalPrice = cartTotalItemPrice + cartOrderTotalShippingFee;
  const cartFormattedFinalTotalPrice = cartFinalTotalPrice.toLocaleString();

  // payment method
  const handlePaymentChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // 우편번호
  const openPostcodeFinder = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setAddress({
          zip: data.zonecode,
          street: data.roadAddress,
          detail: "",
        });
      },
    }).open();
  };

  // 동의
  const handleAgreeBtnClick = () => {
    setIsAgree(!isAgree);
  };

  // 결제하기
  const handlePaymentBtnClick = () => {
    if (isAgree) {
      if (orderkind === "direct_order") {
        handleDirectOrder();
      } else if (orderkind === "cart_one_order") {
        handleCartOneOrder();
      } else if (orderkind === "cart_order") {
        handleCartOrder();
      }
    }
  };

  // direct_order 주문 생성
  const handleDirectOrder = async () => {
    const orderData = {
      product_id: selectedProduct.product_id,
      quantity: selectedProduct.quantity,
      order_kind: orderkind,

      receiver: recipientName,
      receiver_phone_number: Object.values(recipientPhone).join(""),
      address: Object.values(address).join(""),
      address_message: deliveryMessage,
      payment_method: selectedPaymentMethod,
      total_price:
        selectedProduct.price * selectedProduct.quantity +
        selectedProduct.shipping_fee,
    };

    try {
      const response = await fetch("https://openmarket.weniv.co.kr/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order creation failed:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      navigate("/paymentcompleted");
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // cart_one_order 주문 생성
  const handleCartOneOrder = async () => {
    const orderData = {
      product_id: selectedProduct.product_id,
      quantity: selectedProduct.quantity,
      order_kind: orderkind,
      total_price:
        selectedProduct.price * selectedProduct.quantity +
        selectedProduct.shipping_fee,

      receiver: recipientName,
      receiver_phone_number: Object.values(recipientPhone).join(""),
      address: Object.values(address).join(""),
      address_message: deliveryMessage,
      payment_method: selectedPaymentMethod,
    };

    try {
      const response = await fetch("https://openmarket.weniv.co.kr/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order creation failed:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      navigate("/paymentcompleted");
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  // cart_order 주문 생성
  const handleCartOrder = async () => {
    const orderData = {
      total_price: cartFinalTotalPrice,
      order_kind: orderkind,

      receiver: recipientName,
      receiver_phone_number: Object.values(recipientPhone).join(""),
      address: Object.values(address).join(""),
      address_message: deliveryMessage,
      payment_method: selectedPaymentMethod,
    };

    try {
      const response = await fetch("https://openmarket.weniv.co.kr/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order creation failed:", errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      navigate("/paymentcompleted");
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  return (
    <>
      <Header />
      <MainStyle>
        <h2>주문/결제하기</h2>
        <InfoTxtStyle>
          <span>상품정보</span>
          <span>할인</span>
          <span>배송비</span>
          <span>주문금액</span>
        </InfoTxtStyle>
        <OrderItemsContainerStyle>
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
              <TotalPriceStyle>
                <p>총 주문금액</p>
                <strong>{formattedFinalTotalPrice}원</strong>
              </TotalPriceStyle>
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
              <TotalPriceStyle>
                <p>총 주문금액</p>
                <strong>{cartFormattedFinalTotalPrice}원</strong>
              </TotalPriceStyle>
            </>
          )}
        </OrderItemsContainerStyle>
        <DeliveryInfoContainerStyle>
          <h3>배송정보</h3>
          <OrdererInfoStyle>
            <h4>주문자 정보</h4>
            <OrdererNameStyle>
              <label htmlFor="ordererName">이름</label>
              <input
                id="ordererName"
                value={ordererName}
                type="text"
                onChange={(e) => setOrdererName(e.target.value)}
              />
            </OrdererNameStyle>
            <OrdererPhoneNumberStyle>
              <label htmlFor="ordererPhone">휴대폰</label>
              <input
                id="ordererPhone"
                value={ordererPhone.part1}
                type="text"
                onChange={(e) =>
                  setOrdererPhone({ ...ordererPhone, part1: e.target.value })
                }
              />
              <span>-</span>
              <input
                id="ordererPhone"
                value={ordererPhone.part2}
                type="text"
                onChange={(e) =>
                  setOrdererPhone({ ...ordererPhone, part2: e.target.value })
                }
              />
              <span>-</span>
              <input
                id="ordererPhone"
                value={ordererPhone.part3}
                type="text"
                onChange={(e) =>
                  setOrdererPhone({ ...ordererPhone, part3: e.target.value })
                }
              />
            </OrdererPhoneNumberStyle>
            <OrdererEmailStyle>
              <label htmlFor="ordererEmail">이메일</label>
              <input
                id="ordererEmail"
                value={ordererEmail}
                type="text"
                onChange={(e) => setOrdererEmail(e.target.value)}
              />
            </OrdererEmailStyle>
          </OrdererInfoStyle>
          <DeliveryAddressInfoStyle>
            <h4>배송지 정보</h4>
            <DeliveryAddressRecipientStyle>
              <label htmlFor="recipientName">수령인</label>
              <input
                type="text"
                id="recipientName"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </DeliveryAddressRecipientStyle>
            <DeliveryAddressPhoneNumberStyle>
              <label htmlFor="recipientPhone">휴대폰</label>
              <input
                type="text"
                id="recipientPhone"
                value={recipientPhone.part1}
                onChange={(e) =>
                  setRecipientPhone({
                    ...recipientPhone,
                    part1: e.target.value,
                  })
                }
              />
              <span>-</span>
              <input
                type="text"
                id="recipientPhone"
                value={recipientPhone.part2}
                onChange={(e) =>
                  setRecipientPhone({
                    ...recipientPhone,
                    part2: e.target.value,
                  })
                }
              />
              <span>-</span>
              <input
                type="text"
                id="recipientPhone"
                value={recipientPhone.part3}
                onChange={(e) =>
                  setRecipientPhone({
                    ...recipientPhone,
                    part3: e.target.value,
                  })
                }
              />
            </DeliveryAddressPhoneNumberStyle>
            <DeliveryAddressStyle>
              <label htmlFor="addressZip">배송주소</label>
              <div>
                <input
                  id="addressZip"
                  placeholder="우편번호"
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                  type="text"
                />
                <input
                  type="button"
                  value="우편번호 찾기"
                  onClick={openPostcodeFinder}
                />
                <br />
                <input
                  id="addressZip"
                  placeholder="도로명 주소"
                  value={address.street}
                  type="text"
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                />
                <br />
                <input
                  id="addressZip"
                  placeholder="상세 주소"
                  value={address.detail}
                  type="text"
                  onChange={(e) =>
                    setAddress({ ...address, detail: e.target.value })
                  }
                />
              </div>
            </DeliveryAddressStyle>
            <DeliveryAddressMessageStyle>
              <label htmlFor="deliveryMessage">배송메시지</label>
              <input
                id="deliveryMessage"
                value={deliveryMessage}
                type="text"
                onChange={(e) => setDeliveryMessage(e.target.value)}
              />
            </DeliveryAddressMessageStyle>
          </DeliveryAddressInfoStyle>
        </DeliveryInfoContainerStyle>
        <PaymentMethodContainerStyle>
          <PaymentMethodStyle>
            <h4>결제수단</h4>
            <PaymentChooseStyle>
              <div>
                <input
                  type="radio"
                  id="card"
                  name="payment-method"
                  value="CARD"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="card">신용/체크카드</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no-bankbook"
                  name="payment-method"
                  value="DEPOSIT"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="no-bankbook">무통장 입금</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="mobile-phone"
                  name="payment-method"
                  value="PHONE_PAYMENT"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="mobile-phone">휴대폰 결제</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="naver-pay"
                  name="payment-method"
                  value="NAVERPAY"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="naver-pay">네이버페이</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="kakao-pay"
                  name="payment-method"
                  value="KAKAOPAY"
                  onChange={handlePaymentChange}
                />
                <label htmlFor="kakao-pay">카카오페이</label>
              </div>
            </PaymentChooseStyle>
          </PaymentMethodStyle>
          <FinalPaymentInfoStyle>
            <h4>최종결제 정보</h4>
            <InfoBoxStyle>
              <div className="content-price">
                <div className="content-txt">
                  <p>
                    <span>-</span>상품금액
                  </p>
                </div>

                {orderkind === "direct_order" ||
                orderkind === "cart_one_order" ? (
                  <>
                    <div className="price-txt">
                      <strong>{formattedPrice}</strong>
                      <span>원</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="price-txt">
                      <strong>{formattedCartTotalItemPrice}</strong>
                      <span>원</span>
                    </div>
                  </>
                )}
              </div>
              <div className="content-discount">
                <div className="content-txt">
                  <p>
                    <span>-</span>할인금액
                  </p>
                </div>
                <div className="price-txt">
                  <strong>0</strong>
                  <span>원</span>
                </div>
              </div>
              <div className="content-delivery-fee">
                <div className="content-txt">
                  <p>
                    <span>-</span>배송비
                  </p>
                </div>

                {orderkind === "direct_order" ||
                orderkind === "cart_one_order" ? (
                  <>
                    <div className="price-txt">
                      <strong>{shippingFee}</strong>
                      <span>원</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="price-txt">
                      <strong>{formattedCartOrderTotalShippingFee}</strong>
                      <span>원</span>
                    </div>
                  </>
                )}
              </div>
              <div className="content-payment">
                <div className="content-txt">
                  <p>
                    <span>-</span>결제금액
                  </p>
                </div>
                {orderkind === "direct_order" ||
                orderkind === "cart_one_order" ? (
                  <>
                    <strong>{formattedFinalTotalPrice}원</strong>
                  </>
                ) : (
                  <>
                    <strong>{cartFormattedFinalTotalPrice}원</strong>
                  </>
                )}
              </div>
              <ContentAgreementStyle>
                <button type="button" onClick={handleAgreeBtnClick}>
                  {isAgree ? (
                    <img src={iconCheckFill} alt="체크버튼" />
                  ) : (
                    <img src={iconCheck} alt="체크버튼" />
                  )}
                </button>
                <span>
                  주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                </span>
                <button
                  style={{
                    backgroundColor:
                      isAgree && isCompleted
                        ? "var(--color-orange)"
                        : "var(--color-maroon)",
                  }}
                  disabled={!isAgree}
                  type="button"
                  onClick={handlePaymentBtnClick}
                >
                  결제하기
                </button>
              </ContentAgreementStyle>
            </InfoBoxStyle>
          </FinalPaymentInfoStyle>
        </PaymentMethodContainerStyle>
      </MainStyle>
      <Footer />
    </>
  );
}

const MainStyle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 36px;
    padding: 54px 0 52px 0;
    text-align: center;
    font-weight: bold;
  }
`;

const InfoTxtStyle = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr 1fr;
  width: 1280px;
  background-color: var(--color-lightgrey);
  border-radius: 10px;
  padding: 19px 0;
  font-size: 18px;
  margin-bottom: 18px;

  span {
    justify-self: center;
  }
`;

const OrderItemsContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderItemStyle = styled.div`
  display: grid;
  grid-template-columns: 2.2fr 1fr 1fr 1fr;
  align-items: center;
  width: 1280px;
  background-color: var(--color-lightgrey);
  padding: 8px 0 18px 0;

  span,
  strong {
    justify-self: center;
    font-size: 18px;
  }

  span {
    color: var(--color-darkgrey);
  }

  strong {
    color: var(--color-black);
    font-weight: bold;
  }
`;

const ItemDetailStyle = styled.div`
  display: flex;
  gap: 36px;

  button {
    margin-left: 8px;
    img {
      width: 104px;
      height: 104px;
      border-radius: 10px;
    }
  }
`;

const ItemInfoStyle = styled.div`
  padding: 12px 0;

  p {
    &:nth-of-type(1),
    &:nth-of-type(3) {
      font-size: 14px;
      color: var(--color-darkgrey);
    }

    &:nth-of-type(2) {
      font-size: 18px;
      font-weight: bold;
      color: var(--color-black);
      padding: 6px 0 10px 0;
    }
  }
`;

const TotalPriceStyle = styled.div`
  margin-left: auto;
  padding-top: 35px;
  display: flex;
  gap: 10px;

  p {
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }

  strong {
    font-size: 24px;
    color: #eb5757;
    line-height: 15px;
    font-weight: bold;
  }
`;

const DeliveryInfoContainerStyle = styled.div`
  width: 1280px;
  padding-top: 83px;

  h3 {
    font-size: 24px;
    font-weight: bold;
    padding-bottom: 18px;
    border-bottom: 2px solid var(--color-orange);
  }
`;

const OrdererInfoStyle = styled.div`
  h4 {
    padding: 40px 0 8px 0;
    border-bottom: 2px solid var(--color-orange);
    font-size: 18px;
  }

  div {
    border-bottom: 1px solid var(--color-orange);
    padding: 18px 0;
    position: relative;

    input {
      position: absolute;
      left: 170px;
      top: 6px;
      border: 1px solid var(--color-orange);
      background-color: var(--color-apricot);
      font-size: 16px;
      color: var(--color-black);
    }

    label {
      font-size: 16px;
      color: var(--color-black);
    }

    span {
      position: absolute;
      left: 165px;
      top: 16px;
    }
  }
`;

const OrdererNameStyle = styled.div`
  input {
    width: 324px;
    height: 40px;
    padding: 5px;
  }
`;

const OrdererEmailStyle = styled.div`
  input {
    width: 324px;
    height: 40px;
    padding: 5px;
  }
`;

const OrdererPhoneNumberStyle = styled.div`
  span {
    &:nth-of-type(1) {
      transform: translateX(100px);
    }

    &:nth-of-type(2) {
      transform: translateX(227px);
    }
  }

  input {
    width: 70px;
    height: 40px;
    padding: 5px;

    &:nth-of-type(2) {
      transform: translateX(127px);
    }

    &:nth-of-type(3) {
      transform: translateX(254px);
    }
  }
`;

const DeliveryAddressInfoStyle = styled.div`
  padding-bottom: 70px;

  h4 {
    padding: 40px 0 8px 0;
    border-bottom: 2px solid var(--color-orange);
    text-shadow: -1px 0px var(--color-orange), 0px 1px var(--color-orange),
      1px 0px var(--color-orange), 0px -1px var(--color-orange);
    color: var(--color-black);
    font-weight: bold;
    font-size: 18px;
  }

  div {
    position: relative;

    label {
      font-size: 16px;
      text-shadow: -1px 0px var(--color-orange), 0px 1px var(--color-orange),
        1px 0px var(--color-orange), 0px -1px var(--color-orange);
      color: var(--color-black);
      font-weight: bold;
    }
  }
`;

const DeliveryAddressRecipientStyle = styled.div`
  border-bottom: 1px solid var(--color-orange);
  padding: 18px 0;
  input {
    width: 326px;
    height: 40px;
    padding: 5px;
    position: absolute;
    left: 170px;
    top: 6px;
    border: 1px solid var(--color-orange);
    background-color: var(--color-apricot);
    font-size: 16px;
  }
`;

const DeliveryAddressPhoneNumberStyle = styled.div`
  border-bottom: 1px solid var(--color-orange);
  padding: 18px 0;
  input {
    width: 72px;
    height: 40px;
    padding: 5px;
    position: absolute;
    left: 170px;
    top: 6px;
    border: 1px solid var(--color-orange);
    background-color: var(--color-apricot);
    font-size: 16px;

    &:nth-of-type(2) {
      transform: translateX(127px);
    }

    &:nth-of-type(3) {
      transform: translateX(254px);
    }
  }

  span {
    position: absolute;
    left: 170px;
    top: 16px;

    &:nth-of-type(1) {
      transform: translateX(100px);
    }

    &:nth-of-type(2) {
      transform: translateX(227px);
    }
  }
`;

const DeliveryAddressMessageStyle = styled.div`
  border-bottom: 1px solid var(--color-orange);
  padding: 18px 0;
  input {
    height: 40px;
    width: 326px;
    padding: 5px;
    position: absolute;
    left: 170px;
    top: 6px;
    border: 1px solid var(--color-orange);
    background-color: var(--color-apricot);
    font-size: 16px;
  }
`;

const DeliveryAddressStyle = styled.div`
  border-bottom: 1px solid var(--color-orange);
  padding: 8px 0;
  display: flex;

  label {
    line-height: 50px;
  }

  div {
    padding: 0;
    transform: translateX(106px);

    input {
      margin-left: 6px;

      &::placeholder {
        color: var(--color-maroon);
        opacity: 80%;
      }

      &:nth-of-type(1) {
        width: 160px;
        height: 30px;
        padding: 5px;
        margin-bottom: 8px;
      }

      &:nth-of-type(1),
      &:nth-of-type(3) {
        margin-bottom: 8px;
      }

      &:nth-of-type(3),
      &:nth-of-type(4) {
        width: 790px;
        height: 30px;
        padding: 5px;
      }
    }

    input[type="text"] {
      height: 40px;
      border: 1px solid var(--color-orange);
      background-color: var(--color-apricot);
      font-size: 16px;
    }

    input[type="button"] {
      position: absolute;
      left: 170px;
      cursor: pointer;
      width: 154px;
      height: 40px;
      background-color: var(--color-maroon);
      color: var(--color-bg);
      border-radius: 5px;
      font-size: 16px;
    }
  }
`;

const PaymentMethodContainerStyle = styled.div`
  width: 1280px;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  gap: 40px;
  padding-bottom: 200px;
`;

const PaymentMethodStyle = styled.div`
  h4 {
    padding: 40px 0 18px 0;
    border-bottom: 2px solid var(--color-orange);
    font-size: 24px;
    font-weight: bold;
  }
`;

const PaymentChooseStyle = styled.div`
  border-bottom: 2px solid var(--color-orange);
  padding: 18px 0;
  display: flex;
  gap: 20px;

  input[type="radio"] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    margin-bottom: 10px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      border: 2px solid var(--color-orange);
      border-radius: 50%;
      background-color: var(--color-lightgrey);
    }
  }

  input[type="radio"]:checked + label::after {
    content: "";
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--color-orange);
  }
`;

const FinalPaymentInfoStyle = styled.div`
  h4 {
    padding: 40px 0 18px 0;
    font-size: 24px;
  }
`;

const InfoBoxStyle = styled.div`
  border: 2px solid var(--color-maroon);
  border-radius: 10px;
  overflow: hidden;
  padding: 34px 0 0 0;

  > div {
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(3),
    &:nth-of-type(4) {
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      margin: 0 30px;
    }

    &:nth-of-type(4) {
      border-top: 1px solid var(--color-orange);
      padding-top: 29px;
      padding-bottom: 25px;
      strong {
        font-size: 24px;
        color: #eb5757;
        font-weight: bold;
        line-height: 14px;
      }
    }

    > div {
      font-size: 16px;
      color: #000;

      span {
        padding-right: 5px;
      }

      &:nth-of-type(2) {
        strong {
          font-size: 18px;
          font-weight: bold;
          line-height: 12px;
        }

        span {
          font-size: 14px;
          color: var(--color-darkgrey);
          margin-left: 3px;
        }
      }
    }
  }
`;

const ContentAgreementStyle = styled.div`
  background-color: var(--color-lightgrey);
  padding: 32px 30px;
  text-align: center;

  button {
    &:nth-of-type(1) {
      padding-right: 10px;
    }

    &:nth-of-type(2) {
      width: 220px;
      height: 68px;
      background-color: var(--color-maroon);
      border-radius: 5px;
      font-size: 24px;
      color: var(--color-bg);
      margin-top: 30px;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  span {
    font-size: 16px;
  }
`;
