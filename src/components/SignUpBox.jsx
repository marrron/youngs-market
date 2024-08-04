import React, { useState } from "react";
import styled from "styled-components";
import iconCheckBox from "../assets/images/icon-check-box.svg";
import iconCheckFillBox from "../assets/images/icon-check-fill-box.svg";

const SignUpBox = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [firstDigit, setFirstDigit] = useState("010");
	const [middleDigit, setMiddleDigit] = useState("");
	const [lastDigit, setLastDigit] = useState("");

	const firstDigits = ["010", "011", "016", "017", "018", "019"];

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	return (
		<>
			<TabContainer>
				<Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
					구매회원가입
				</Tab>
				<Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
					판매회원가입
				</Tab>
			</TabContainer>
			<SignUpContainer>
				<FormContainer>
					{activeTab === 0 ? (
						<Form action="/login" method="post">
							<p>아이디</p>
							<Input type="text" placeholder="" required />
							<p>비밀번호</p>
							<Input type="password" placeholder="" required />
							<p>비밀번호 재확인</p>
							<Input type="password" placeholder="" required />
							<p>이름</p>
							<Input type="text" placeholder="" required />
							<p>휴대폰번호</p>
							<PhoneNumber>
								<select
									value={firstDigit}
									onChange={(e) => setFirstDigit(e.target.value)}
								>
									{firstDigits.map((code) => (
										<option key={code} value={code}>
											{code}
										</option>
									))}
								</select>
								<input type="text" />
								<input type="text" />
							</PhoneNumber>
							<p>이메일</p>
							<Email>
								<input type="text" />
								@
								<input type="text" />
							</Email>
						</Form>
					) : (
						<Form action="/login" method="post">
							<Input
								type="email"
								id="seller-email"
								name="seller-email"
								placeholder="아이디"
								required
							/>
							<Input
								type="password"
								id="seller-password"
								name="seller-password"
								placeholder="비밀번호"
								required
							/>
						</Form>
					)}
				</FormContainer>
			</SignUpContainer>
			<Terms>
				<img src={iconCheckBox} alt="" />
				<p>
					호두샵의 <u style={{ fontWeight: 700 }}>이용약관</u> 및{" "}
					<u style={{ fontWeight: 700 }}>개인정보처리방침</u>에 대한 내용을
					확인하였고 동의합니다.
				</p>
			</Terms>
			<Join>
				<button>가입하기</button>
			</Join>
		</>
	);
};

const SignUpContainer = styled.div`
	margin: 0 auto;
	/* margin-top: -7px; */
	padding-top: 40px;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 550px;
	border-radius: 0px 0px 10px 10px;
	border: 1px solid var(--color-orange);
	border-top: 0px;
	overflow: hidden;
	position: relative;
	z-index: 0;
`;

const TabContainer = styled.div`
	display: flex;
	/* overflow: hidden; */
	width: 550px;
	margin: 0 auto;
`;
const Tab = styled.div`
	width: 50%;
	border-top: 1px solid var(--color-orange);
	border-left: 1px solid var(--color-orange);
	border-right: 1px solid var(--color-orange);
	border-bottom: ${(props) => (props.active ? "null" : "1px solid #EC7E62")};
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 20px 82px 38px 82px;
	height: 60px;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	background-color: ${(props) => (props.active ? "white" : "#EDD0C2")};
	/* z-index: ${(props) => (props.active ? "10" : "0")}; */
	&:last-child {
		margin-right: 0;
	}
`;

const FormContainer = styled.div`
	padding-left: 35px;
	padding-right: 35px;
	padding-bottom: 36px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;

	p {
		margin-bottom: 10px;
		font-size: 16px;
		color: var(--color-darkgrey);
	}
	p:nth-child(7) {
		margin-top: 38px;
	}
	p:nth-child(9) {
		margin-top: 4px;
	}
	p:nth-child(11) {
		margin-top: 4px;
	}
`;

const Input = styled.input`
	width: 480px;
	height: 54px;
	border: solid 1px var(--color-orange);
	border-radius: 5px;
	margin-bottom: 12px;
`;

const PhoneNumber = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 12px;

	select {
		width: 152px;
		height: 54px;
		border: solid 1px var(--color-orange);
		border-radius: 5px;
	}

	input {
		margin-left: 12px;
		width: 152px;
		height: 54px;
		border: solid 1px var(--color-orange);
		border-radius: 5px;
		font-size: 18px;
	}
`;

const Email = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	input {
		width: 220px;
		height: 54px;
		border: solid 1px var(--color-orange);
		border-radius: 5px;
	}
`;

const Terms = styled.div`
	margin: 34px auto;
	width: 480px;
	height: 40px;
	display: flex;
	font-size: 16px;
	color: var(--color-darkgrey);

	img {
		width: 16px;
		height: 16px;
		margin-right: 10px;
	}
`;

const Join = styled.div`
	width: 480px;
	margin: 0 auto;

	button {
		width: 100%;
		height: 60px;
		border-radius: 5px;
		background-color: var(--color-orange);
		color: var(--color-white);
		font-size: 18px;
		margin-bottom: 110px;
	}
`;

export default SignUpBox;
