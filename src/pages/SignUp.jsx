import React from "react";
import styled from "styled-components";
import LogoYoungs from "../assets/images/Logo-youngs.svg";
import SignUpBox from "../components/SignUpBox";

export default function SignUp() {
	return (
		<BackGround>
			<img src={LogoYoungs} alt="" className="logo" />
			<SignUpBox></SignUpBox>
		</BackGround>
	);
}

const BackGround = styled.div`
	background-color: var(--color-bg);
	height: 100vh;
	padding-top: 70px;

	.logo {
		width: 266px;
		display: block;
		margin: 0 auto 70px;
	}
`;
