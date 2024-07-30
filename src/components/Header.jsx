import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/Logo-youngs.svg";
import iconSearch from "../assets/images/icon-search.svg";
import iconShoppingCart from "../assets/images/icon-shopping-cart.svg";
import iconUser from "../assets/images/icon-user.svg";

export default function Header() {
  const { token } = useAuth();
  const navigate = useNavigate();

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

  return (
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
        <button className="btn-shopping-cart" type="button">
          <img src={iconShoppingCart} alt="장바구니" />
          <p>장바구니</p>
        </button>

        <button
          className="btn-user"
          type="button"
          onClick={handleUserButtonClick}
        >
          <img src={iconUser} alt="로그인" />
          {token ? <p>마이페이지</p> : <p>로그인</p>}
        </button>
      </UserControlsStyle>
    </HeaderStyle>
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
  button {
    p {
      font-size: 12px;
      color: #767676;
    }

    img {
      width: 32px;
      height: 32px;
    }
  }

  .btn-user {
    margin-left: 30px;
  }

  .btn-shopping-cart {
    width: 60px;
  }

  .btn-shopping-cart:hover,
  .btn-user:hover {
    opacity: 0.6;
  }
`;
