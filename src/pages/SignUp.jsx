import React from "react";
import styled from "styled-components";
import LogoYoungs from "../assets/images/Logo-youngs.svg";
import LoginBox from "../components/LoginBox";

export default function SignUp() {
	return (
		<BackGround>
			<img src={LogoYoungs} alt="" />
			<LoginBox></LoginBox>
		</BackGround>
	);
}

const BackGround = styled.div`
	background-color: var(--color-bg);
	height: 100vh;
	padding-top: 100px;

	img {
		width: 266px;
		display: block;
		margin: 0 auto 70px;
	}
`;
