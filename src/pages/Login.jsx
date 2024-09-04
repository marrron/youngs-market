import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import LogoYoungs from "../assets/images/Logo-youngs.svg";
import LoginBox from "../components/LoginBox";

export default function Login() {
	const navigate = useNavigate("/");

	const onClickLogo = () => {
		navigate("/");
	};
	return (
		<BackGround>
			<img src={LogoYoungs} alt="" onClick={onClickLogo} />
			<LoginBox></LoginBox>
			<AccountLinks>
				<Link to="/signup">회원가입</Link>
				<Link>비밀번호 찾기</Link>
			</AccountLinks>
		</BackGround>
	);
}

const BackGround = styled.div`
	background-color: var(--color-bg);
	height: 100vh;
	padding-top: 100px;

	img {
		cursor: pointer;
		width: 266px;
		display: block;
		margin: 0 auto 70px;
	}
`;
const AccountLinks = styled.div`
	color: #333333;
	text-align: center;
	margin-top: 30px;

	a {
		color: #333333;
		font-size: 16px;
		position: relative; // pseudo element의 위치를 기준으로 설정
		text-decoration: none;
	}
	a:first-child {
		margin-right: 33px;
	}

	// pseudo element를 사용하여 수직선 추가
	a:not(:first-child)::before {
		content: "";
		width: 1px; // 선의 두께
		height: 16px; // 선의 높이
		background-color: #333333; // 선의 색상
		position: absolute;
		left: -14px;
		top: 50%; // 중앙 정렬
		transform: translateY(-50%); // 세로 중앙 정렬
	}
`;
