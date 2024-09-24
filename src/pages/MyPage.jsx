import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import UserImg from "../assets/images/icon-user-2.svg";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function MyPage() {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUsername(user.displayName || "이름이 설정되지 않았습니다.");
			} else {
				setUsername("");
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<>
			<Header></Header>
			<MyPageContainer>
				<MyInformation>
					<div>
						<img src={UserImg} alt="" />
						<p>{username}님</p>
						<p>적립금: 0원 예치금: 0원 쿠폰: 1개</p>
					</div>
				</MyInformation>
				<MyOrder>
					<OrderStatus>
						<BoldText>나의 주문처리 현황</BoldText> (최근 3개월 기준)
					</OrderStatus>
					<OrderStep>
						<StepContainer className="line">
							<h4>입금전</h4>
							<p>0</p>
						</StepContainer>
						<StepContainer className="line">
							<h4>배송준비중</h4>
							<p>0</p>
						</StepContainer>
						<StepContainer className="line">
							<h4>배송중</h4>
							<p>0</p>
						</StepContainer>
						<StepContainer>
							<h4>배송완료</h4>
							<p>0</p>
						</StepContainer>
					</OrderStep>
					<OrderRequest>
						<div>
							<h4>취소:</h4>
							<p>0</p>
						</div>
						<div>
							<h4>교환:</h4>
							<p>0</p>
						</div>
						<div>
							<h4>반품:</h4>
							<p>0</p>
						</div>
					</OrderRequest>
				</MyOrder>
				<MyPageMenu>
					<div>
						<p>주문조회</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>회원정보</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>관심상품</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>적립금</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>예치금</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>쿠폰</p>
						<p>&#62;</p>
					</div>
					<div>
						<p>배송 주소록 관리</p>
						<p>&#62;</p>
					</div>
				</MyPageMenu>
			</MyPageContainer>
		</>
	);
}

const BoldText = styled.span`
	font-weight: bold;
`;

const MyPageContainer = styled.div`
	width: 1280px;
	margin: 70px auto 0;
`;

const MyInformation = styled.div`
	width: 100%;
	height: 100px;
	background-color: #fff;
	border-radius: 10px;
	margin-bottom: 38px;
	padding-left: 100px;
	padding-right: 100px;

	div {
		display: flex;
		align-items: center;
		padding-top: 34px;
	}
	img {
		margin-right: 70px;
	}
	p:nth-child(2) {
		margin-right: 640px;
		font-size: 20px;
		font-weight: 700;
	}
	p:nth-child(3) {
		font-size: 18px;
	}
`;

const MyOrder = styled.div`
	width: 100%;
	height: 240px;
	background-color: #fff;
	border-radius: 10px;
	margin-bottom: 38px;

	h4 {
		margin-bottom: 20px;
	}
`;

const OrderStatus = styled.div`
	padding: 18px 0 0 50px;
	height: 58px;
	border-bottom: 1px solid var(--color-maroon);
	font-size: 18px;
`;

const OrderStep = styled.div`
	height: 124px;
	display: flex;
	justify-content: space-around;
	padding-top: 25px;
	text-align: center;
	font-size: 18px;
`;

const StepContainer = styled.div`
	position: relative;
	&.line::before {
		content: "";
		position: absolute;
		width: 1px;
		height: 96px;
		background-color: var(--color-maroon);
		top: -10px;
		left: 200px;
	}
`;

const OrderRequest = styled.div`
	background-color: var(--color-maroon);
	height: 58px;
	border-radius: 10px;
	color: var(--color-bg);
	display: flex;
	font-size: 18px;
	padding: 19px 50px 17px 50px;

	div {
		display: flex;
		width: 327px;
		margin-right: 100px;
		justify-content: space-between;
		position: relative;

		&::after {
			content: "";
			position: absolute;
			width: 1px;
			height: 58px;
			background-color: var(--color-bg);
			top: -19px;
			left: 400px;
		}
	}
	div:nth-child(3) {
		margin-right: 0;
		&::after {
			display: none;
		}
	}
`;

const MyPageMenu = styled.div`
	width: 100%;
	height: 350px;
	background-color: #fff;
	border-radius: 10px;
	font-size: 18px;
	div {
		height: 50px;
		display: flex;
		border-bottom: 1px solid var(--color-maroon);
		padding: 14px 50px;
		justify-content: space-between;
	}
	div:nth-child(7) {
		border-bottom: none;
	}
`;
