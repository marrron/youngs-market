import React from "react";
import styled, { keyframes } from "styled-components";

export default function Instruction() {
  return (
    <InstructionStyle>
      <p>재고 수량을 초과하였습니다.</p>
    </InstructionStyle>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 0.85;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0.85;
  }
  to {
    opacity: 0;
  }
`;

const InstructionStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;

  width: 880px;
  text-align: center;
  padding: 20px 0;
  opacity: 0.85;
  border-radius: 10px;
  background-color: var(--color-darkgrey);

  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 1.5s forwards;

  p {
    font-size: 20px;
    color: var(--color-lightgrey);
  }
`;
