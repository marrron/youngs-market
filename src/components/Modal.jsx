import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";
import deleteBtn from "../assets/images/icon-delete.svg";

export default function Modal({
  closeModal,
  modalTxt,
  leftBtnText = "아니오",
  rightBtnText = "예",
  handleRightBtnClick,
}) {
  const navigate = useNavigate();
  const { token } = useAuth();

  const defaultHandleRightBtnClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/shoppingcart");
    }
  };

  return (
    <ModalBgStyle>
      <ModalStyle>
        <ModalTxt>{modalTxt}</ModalTxt>
        <AnswerActionStyle>
          <button type="button" onClick={closeModal}>
            {leftBtnText}
          </button>
          <button
            type="button"
            onClick={handleRightBtnClick || defaultHandleRightBtnClick}
          >
            {rightBtnText}
          </button>
        </AnswerActionStyle>
        <CloseButton
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          <img src={deleteBtn} alt="닫기버튼" />
        </CloseButton>
      </ModalStyle>
    </ModalBgStyle>
  );
}

const ModalBgStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
`;

const ModalStyle = styled.div`
  min-width: 360px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: var(--color-lightgrey);
  transform: translate(-50%, -50%);
  border: 1px solid var(--color-grey);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 10px;

  p {
    font-size: 16px;
    line-height: 20px;
  }
`;

const ModalTxt = styled.div`
  line-height: 20px;
`;

const AnswerActionStyle = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;

  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    margin-top: 30px;
  }

  button:nth-child(1) {
    background-color: var(--color-lightgrey);
    border: 1px solid var(--color-orange);
    color: var(--color-darkgrey);
  }

  button:nth-child(2) {
    background-color: var(--color-maroon);
    color: var(--color-lightgrey);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover::after {
    content: "";
    position: absolute;
    top: -6px;
    right: -7px;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: #000;
    opacity: 0.1;
  }
`;
