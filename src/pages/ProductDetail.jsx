import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/ProductContext";
import { useCartItems } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import minusBtn from "../assets/images/icon-minus-line.svg";
import plusBtn from "../assets/images/icon-plus-line.svg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Instruction from "../components/Instruction";
import { useOrder } from "../context/OrderContext";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export default function ProductDetail() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { selectedProduct, setSelectedProduct } = useProduct();
  const { cartItemsIntersection } = useCartItems();
  const { token, loginType } = useAuth();
  const { setOrderkind } = useOrder();
  const [quantity, setQuantity] = useState(1);
  const [activeBtn, setActiveBtn] = useState("버튼");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTxt, setModalTxt] = useState("");
  const [inCartItem, setInCartItem] = useState([]);
  const [showInstruction, setShowInstruction] = useState(false);

  // 변수
  const cartStock = selectedProduct.length > 0 ? selectedProduct[0].stock : 0;
  const cartQuantity =
    selectedProduct.length > 0 ? selectedProduct.quantity : 0;
  const cartProductId =
    selectedProduct.length > 0 ? selectedProduct[0].product_id : "";
  const havingItem = inCartItem.some((e) => e.product_id === cartProductId);
  console.log(cartStock, cartQuantity, cartProductId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // 로그인된 사용자가 있을 때 처리
        console.log("User is logged in:", currentUser);
      } else {
        // 로그인된 사용자가 없을 때 처리
        console.log("No user is logged in");
      }
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => unsubscribe();
  }, []);

  // 수량 증가 버튼
  const increaseQuantity = () => {
    if (quantity < cartStock) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      setShowInstruction(true);
      setTimeout(() => {
        setShowInstruction(false);
      }, 1500);
    }
  };

  // 수량 감소 버튼
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // selectedProduct price
  const formattedPrice = (price) => {
    return price ? price.toLocaleString() : "0";
  };

  const totalPrice =
    selectedProduct.length > 0 ? selectedProduct[0].price * quantity : 0;
  const formattedTotalPrice = totalPrice.toLocaleString();

  // info-action 버튼
  const handleInfoActionBtnClick = (buttonName) => {
    setActiveBtn(buttonName);
  };

  // 모달버튼 클릭
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 장바구니 버튼 클릭
  const handleShoppingCartBtnClick = () => {
    // console.log(
    //   "cartStock",
    //   cartStock,
    //   "cartQuantity",
    //   cartQuantity,
    //   "quantity",
    //   quantity,
    //   "inCartItem",
    //   inCartItem,
    //   "cartItemsIntersection",
    //   cartItemsIntersection
    // );

    if (token && loginType === "BUYER") {
      if (!havingItem) {
        setModalTxt(
          <>
            장바구니에 상품을 담았습니다.
            <br />
            장바구니로 이동하시겠습니까?
          </>
        );
        openModal();
        putInShoppingCart();
      } else if (havingItem) {
        setModalTxt(
          <>
            이미 장바구니에 있는 상품입니다.
            <br />
            장바구니로 이동하시겠습니까?
          </>
        );
        openModal();
      }
    } else if (!token && loginType === "BUYER") {
      openModal();
      setModalTxt(
        <>
          로그인이 필요한 서비스입니다.
          <br />
          로그인하시겠습니까?
        </>
      );
    } else if (loginType === "SELLER") {
      openModal();
      setModalTxt(
        <>
          구매자 로그인 시만 가능합니다.
          <br />
          로그아웃 하시겠습니까?
        </>
      );
    }
  };

  // 장바구니 가져오기
  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      if (user) {
        const buyerDocRef = doc(db, "buyers", user.uid);
        const shoppingCartDocRef = collection(buyerDocRef, "incart");

        unsubscribe = onSnapshot(shoppingCartDocRef, (snapshot) => {
          const cartItems = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          setInCartItem(cartItems); // 장바구니 아이템 업데이트
        });
      }
    };

    fetchData();

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  // 장바구니에 넣기
  const putInShoppingCart = async () => {
    const buyerDocRef = doc(db, "buyers", user.uid);
    const shoppingCartDocRef = collection(buyerDocRef, "incart");

    try {
      const newDocRef = await addDoc(shoppingCartDocRef, {
        store_name: selectedProduct[0].store_name,
        product_name: selectedProduct[0].product_name,
        price: selectedProduct[0].price,
        shipping_method: selectedProduct[0].shipping_method,
        shipping_fee: selectedProduct[0].shipping_fee,
        quantity: selectedProduct[0].quantity,
        stock: selectedProduct[0].stock,
        product_id: cartProductId,
        image: selectedProduct[0].image,
        seller_id: selectedProduct[0].seller_id,
      });

      await setDoc(
        newDocRef,
        {
          id: newDocRef.id,
        },
        { merge: true }
      );
    } catch (e) {
      console.log(e);
    }

    // setModalTxt(
    //   <>
    //     재고 수량이 부족하여 <br />
    //     장바구니에 담을 수 없습니다. <br />
    //     장바구니로 이동하시겠습니까?
    //   </>
    // );
    // openModal();
  };

  console.log("inCartItem", inCartItem);

  useEffect(() => {
    const filteredCartItem = cartItemsIntersection.filter(
      (item) => item.product_id === cartProductId
    );

    if (selectedProduct.length > 0) {
      const updatedProduct = { ...selectedProduct[0], quantity: quantity };
      setSelectedProduct([updatedProduct]);
    }

    setInCartItem(filteredCartItem);
  }, [cartItemsIntersection, cartProductId, quantity]);

  // 바로구매 버튼
  const handleBuyNowBtnClick = () => {
    if (token && loginType === "BUYER") {
      setOrderkind("direct_order");
      navigate("/order");
    } else if (!token && loginType === "BUYER") {
      openModal();

      setModalTxt(
        <>
          로그인이 필요한 서비스입니다.
          <br />
          로그인하시겠습니까?
        </>
      );
    } else if (loginType === "SELLER") {
      openModal();
      setModalTxt(
        <>
          구매자 로그인 시만 가능합니다.
          <br />
          로그아웃 하시겠습니까?
        </>
      );
    }
  };

  return (
    <>
      {isModalOpen ? <Modal closeModal={closeModal} modalTxt={modalTxt} /> : ""}
      {showInstruction && token && <Instruction />}
      {cartStock === cartQuantity && <Instruction />}
      <Header />
      <MainStyle>
        <div className="product-image">
          <img
            src={selectedProduct.length > 0 ? selectedProduct[0].image : ""}
            alt="상품이미지"
          />
        </div>
        <ProductInfoStyle>
          <p className="store-name">
            {selectedProduct.length > 0 ? selectedProduct[0].store_name : ""}
          </p>
          <p className="product-name">
            {selectedProduct.length > 0 ? selectedProduct[0].product_name : ""}
          </p>
          <strong className="product-price">
            {formattedPrice(
              selectedProduct.length > 0 ? selectedProduct[0].price : 0
            )}
          </strong>
          <span className="currency-unit">원</span>
          <p className="delivery">
            택배배송<span>/</span>무료배송
          </p>
          <QuantityControlStyle>
            <button
              className="decrease-btn"
              type="button"
              onClick={decreaseQuantity}
            >
              <img src={minusBtn} alt="수량감소버튼" />
            </button>
            <button className="product-quantity" type="button">
              {selectedProduct.length > 0 ? quantity : 0}
            </button>
            <button
              className="increase-btn"
              type="button"
              onClick={increaseQuantity}
            >
              <img src={plusBtn} alt="수량추가버튼" />
            </button>
          </QuantityControlStyle>
          <TotalPriceStyle>
            <span className="total-price-txt">총 상품 금액</span>
            <div className="total-quantity">
              <p>
                총 수량 <span>{selectedProduct.length > 0 ? quantity : 0}</span>
                개
              </p>
              <span className="bar">|</span>
              <div>
                <strong>
                  {selectedProduct.length > 0 ? formattedTotalPrice : 0}
                </strong>
                <span className="currency-unit maroon">원</span>
              </div>
            </div>
          </TotalPriceStyle>
          <PurchaseActionStyle>
            {selectedProduct.length > 0 && selectedProduct[0].stock > 0 ? (
              <>
                <button
                  onClick={handleBuyNowBtnClick}
                  className="purchase-btn"
                  type="button"
                >
                  바로구매
                </button>
                <button
                  className="shopping-cart-btn"
                  type="button"
                  onClick={handleShoppingCartBtnClick}
                >
                  장바구니
                </button>
              </>
            ) : (
              <>
                <button className="soldout-btn left" type="button">
                  SOLD OUT
                </button>
                <button className="soldout-btn right" type="button">
                  SOLD OUT
                </button>
              </>
            )}
          </PurchaseActionStyle>
        </ProductInfoStyle>
        <InfoActionStyle>
          <button
            className={`info-btn ${activeBtn === "버튼" ? "info-active" : ""}`}
            type="button "
            onClick={() => handleInfoActionBtnClick("버튼")}
          >
            버튼
          </button>
          <button
            className={`info-btn ${activeBtn === "리뷰" ? "info-active" : ""}`}
            type="button"
            onClick={() => handleInfoActionBtnClick("리뷰")}
          >
            리뷰
          </button>
          <button
            className={`info-btn ${activeBtn === "Q&A" ? "info-active" : ""}`}
            type="button"
            onClick={() => handleInfoActionBtnClick("Q&A")}
          >
            Q&A
          </button>
          <button
            className={`info-btn ${
              activeBtn === "반품/교환정보" ? "info-active" : ""
            }`}
            type="button"
            onClick={() => handleInfoActionBtnClick("반품/교환정보")}
          >
            반품/교환정보
          </button>
        </InfoActionStyle>
      </MainStyle>
      <Footer />
    </>
  );
}

const MainStyle = styled.main`
  display: grid;
  grid-template-areas:
    "img product"
    "info info";
  place-items: center;
  padding: 80px;
  grid-gap: 50px;

  .product-image {
    width: 600px;
    height: 600px;
    background-color: #fff;
    grid-area: img;
    justify-self: end;
  }

  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfoStyle = styled.div`
  grid-area: product;
  justify-self: start;

  .store-name {
    font-size: 18px;
    color: #767676;
  }

  .product-name {
    font-size: 36px;
    padding: 16px 0 20px 0;
  }

  .product-price {
    font-size: 36px;
    font-weight: bold;
  }

  .currency-unit {
    font-size: 18px;
  }

  .delivery {
    font-size: 16px;
    color: #767676;
    padding: 138px 0 52px 0;
  }
`;

const QuantityControlStyle = styled.div`
  display: flex;
  padding-bottom: 78px;
  position: relative;

  button {
    border: 1px solid var(--color-orange);
    width: 50px;
    height: 50px;
    background-color: #f2f2f2;
    font-size: 18px;

    &:before {
      content: "";
      width: 630px;
      height: 2px;
      background-color: var(--color-orange);
      top: -30px;
      left: 0;
      position: absolute;
    }

    &:after {
      content: "";
      width: 630px;
      height: 2px;
      background-color: var(--color-orange);
      top: 80px;
      left: 0;
      position: absolute;
    }

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
    }
  }

  .decrease-btn:active {
    background-color: var(--color-maroon);
  }

  .increase-btn:active {
    background-color: var(--color-maroon);
  }
`;

const TotalPriceStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .total-price-txt {
    font-size: 18px;
    font-weight: bold;
  }

  .total-quantity {
    display: flex;
    align-items: center;
    gap: 11px;

    p {
      color: #767676;

      span {
        color: var(--color-maroon);
        font-weight: bold;
      }
    }

    div {
      transform: translateY(-5px);

      strong {
        font-size: 36px;
        color: var(--color-maroon);
        font-weight: bold;
      }
    }
  }

  .bar {
    color: var(--color-orange);
  }
`;

const PurchaseActionStyle = styled.div`
  padding-top: 22px;
  display: flex;
  gap: 14px;

  button {
    height: 60px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 18px;
  }

  .purchase-btn {
    width: 416px;
    background-color: var(--color-maroon);
    color: var(--color-bg);
  }

  .shopping-cart-btn {
    width: 200px;
    background-color: #767676;
    color: var(--color-bg);
  }

  .soldout-btn {
    background-color: var(--color-black);
    color: var(--color-white);
    cursor: auto;
  }

  .left {
    width: 416px;
  }

  .right {
    width: 200px;
  }
`;

const InfoActionStyle = styled.div`
  grid-area: info;
  align-self: start;
  display: flex;
  padding: 140px 0 70px 0;

  .info-btn {
    border-bottom: 6px solid var(--color-orange);
    width: 320px;
    color: #767676;
    padding-bottom: 12px;
    font-weight: bold;
  }

  .info-active {
    color: var(--color-maroon);
    border-bottom: 6px solid var(--color-maroon);
  }

  .maroon {
    color: var(--color-maroon);
  }
`;
