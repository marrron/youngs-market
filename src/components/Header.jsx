import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/Logo-youngs.svg";
import iconSearch from "../assets/images/icon-search.svg";
import iconShoppingCart from "../assets/images/icon-shopping-cart.svg";
import iconShoppingCart2 from "../assets/images/icon-shopping-cart-2.svg";
import iconUser from "../assets/images/icon-user.svg";
import iconShoppingBag from "../assets/images/icon-shopping-bag.svg";

export default function Header() {
  const { token, loginType } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUserButtonClick = () => {
    if (token) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  const handleLogoButtonClick = () => {
    navigate("/");
  };

  const handleShoppingCartButtonClick = () => {
    navigate("/shoppingcart");
  };

  const handleSellerCenterBtnClick = () => {
    if (location.pathname === "/sellercenter") {
      navigate("/sellercenter");
    } else if (location.pathname === "/productupload") {
      navigate("/productupload");
    }
  };

  const isShoppingCartPage = location.pathname === "/shoppingcart";
  const shoppingCartIcon = isShoppingCartPage
    ? iconShoppingCart2
    : iconShoppingCart;

  const cartTextColor = isShoppingCartPage ? "var(--color-orange)" : "inherit";

  return (
    <>
      {location.pathname === "/sellercenter" ||
      location.pathname === "/productupload" ? (
        <SellerCenterHeaderStyle>
          <button
            className="main-logo"
            type="button"
            onClick={handleLogoButtonClick}
          >
            <img src={logo} alt="로고" />
          </button>
          <h1>판매자 센터</h1>
        </SellerCenterHeaderStyle>
      ) : (
        <HeaderStyle>
          <SearchContainerStyle>
            <button
              className="main-logo"
              type="button"
              onClick={handleLogoButtonClick}
            >
              <img src={logo} alt="로고" />
            </button>
            <input
              id="input-search"
              type="text"
              placeholder="상품을 검색해보세요!"
            />
            <button className="btn-search">
              <img src={iconSearch} alt="상품검색" />
            </button>
          </SearchContainerStyle>
          <UserControlsStyle>
            {loginType === "SELLER" && token ? (
              <>
                <button
                  className="btn-user"
                  type="button"
                  onClick={handleUserButtonClick}
                >
                  <img src={iconUser} alt="로그인" />
                  <p>마이페이지</p>
                </button>
                <button
                  className="btn-seller-center"
                  type="button"
                  onClick={handleSellerCenterBtnClick}
                >
                  <img src={iconShoppingBag} alt="판매자센터" />
                  <span>판매자 센터</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-shopping-cart"
                  type="button"
                  onClick={handleShoppingCartButtonClick}
                >
                  <img src={shoppingCartIcon} alt="장바구니" />
                  <p style={{ color: cartTextColor }}>장바구니</p>
                </button>

                <button
                  className="btn-user"
                  type="button"
                  onClick={handleUserButtonClick}
                >
                  <img src={iconUser} alt="로그인" />
                  {token ? <p>마이페이지</p> : <p>로그인</p>}
                </button>
              </>
            )}
          </UserControlsStyle>
        </HeaderStyle>
      )}
    </>
  );
}

const HeaderStyle = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: var(--color-partgrey);
  padding: 18px 0;
`;

const SearchContainerStyle = styled.div`
  display: flex;
  position: relative;

  .main-logo {
    padding-right: 12px;
    margin-bottom: -12px;
  }

  #input-search {
    width: 400px;
    height: 46px;
    border-radius: 50px;
    border: 1px solid var(--color-maroon);
    padding: 0 52px 0 22px;
    font-size: 16px;
    box-sizing: border-box;
    background-color: var(--color-white);
  }

  .btn-search {
    position: absolute;
    right: 22px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const UserControlsStyle = styled.div`
  display: flex;

  button {
    font-size: 12px;
    color: #767676;
    img {
      width: 32px;
      height: 32px;
    }
  }

  .btn-user {
    margin-left: 30px;
    &:hover {
      opacity: 0.6;
    }
  }

  .btn-shopping-cart {
    width: 60px;

    &:hover {
      opacity: 0.6;
    }
  }

  .btn-seller-center {
    background-color: var(--color-maroon);
    width: 168px;
    height: 54px;
    color: var(--color-partgrey);
    border-radius: 5px;
    margin-left: 30px;
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
    span {
      font-size: 18px;
    }
  }
`;

const SellerCenterHeaderStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--color-partgrey);
  padding: 18px 100px;
  gap: 4px;

  h1 {
    font-size: 30px;
    color: #000;
    font-weight: bold;
    transform: translateY(-6px);
  }
`;
