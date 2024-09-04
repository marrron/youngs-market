import React from "react";
import styled from "styled-components";
import Icon404 from "../assets/images/icon-404.svg";
import { Link } from "react-router-dom";

export default function NotFound() {
	const handlePrevPage = () => {
		window.history.back();
	};
	return (
		<Container>
			<img src={Icon404} alt="" />
			<div>
				<Title>페이지를 찾을 수 없습니다.</Title>
				<Contents>
					페이지가 존재하지 않거나 사용할 수 없는 페이지 입니다. 웹 주소가
					올바른지 확인해 주세요.
				</Contents>
				<ButtonContainer>
					<Link to="/">
						<BtnMain>메인으로</BtnMain>
					</Link>
					<BtnPrev onClick={handlePrevPage}>이전 페이지</BtnPrev>
				</ButtonContainer>
			</div>
		</Container>
	);
}
const Container = styled.div`
	display: flex;
	margin: 342px 0 0 590px;
`;

const Title = styled.h4`
	font-size: 36px;
	font-weight: 700;
	margin: 16px 0 20px 50px;
`;

const Contents = styled.p`
	color: var(--color-darkgrey);
	margin: 0 0 40px 50px;
	width: 371px;
`;

const ButtonContainer = styled.div`
	margin-left: 50px;
`;

const BtnMain = styled.button`
	width: 200px;
	height: 60px;
	font-size: 18px;
	color: var(--color-bg);
	background-color: var(--color-maroon);
	border-radius: 5px;
	margin-right: 14px;
	font-weight: 700;
`;

const BtnPrev = styled.button`
	width: 200px;
	height: 60px;
	font-size: 18px;
	color: var(--color-darkgrey);
	background-color: var(--color-bg);
	border: 1px solid var(--color-orange);
	border-radius: 5px;
	font-weight: 700;
`;
