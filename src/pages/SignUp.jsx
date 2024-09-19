import React from "react";
import styled from "styled-components";
import LogoYoungs from "../assets/images/Logo-youngs.svg";
import SignUpBox from "../components/SignUpBox";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate("/");

  const onClickLogo = () => {
    navigate("/");
  };

  return (
    <BackGround>
      <img src={LogoYoungs} alt="" className="logo" onClick={onClickLogo} />
      <SignUpBox></SignUpBox>
    </BackGround>
  );
}

const BackGround = styled.div`
  background-color: var(--color-bg);
  height: 100vh;
  padding-top: 70px;

  .logo {
    cursor: pointer;
    width: 266px;
    display: block;
    margin: 0 auto 70px;
  }
`;
