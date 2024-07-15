import React, { useState } from "react";
import styled from "styled-components";

const LoginPage = () => {
	const [activeTab, setActiveTab] = useState(0);

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	return (
		<LoginContainer>
			<TabContainer>
				<Tab active={activeTab === 0} onClick={() => handleTabClick(0)}>
					구매회원 로그인
				</Tab>
				<Tab active={activeTab === 1} onClick={() => handleTabClick(1)}>
					판매회원 로그인
				</Tab>
			</TabContainer>
			<FormContainer>
				{activeTab === 0 ? (
					<Form action="/login" method="post">
						<Input
							type="email"
							id="buyer-email"
							name="buyer-email"
							placeholder="아이디"
							required
						/>
						<Input
							type="password"
							id="buyer-password"
							name="buyer-password"
							placeholder="비밀번호"
							required
						/>
						<Button type="submit">로그인</Button>
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
						<Button type="submit">로그인</Button>
					</Form>
				)}
			</FormContainer>
		</LoginContainer>
	);
};

const LoginContainer = styled.div`
	margin: 0 auto;
	background-color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 550px;
	height: 352px;
	border-radius: 10px;
	border: 1px solid var(--color-orange);
	overflow: hidden;
`;

const TabContainer = styled.div`
	display: flex;
	overflow: hidden;
	width: 100%;
`;

const Tab = styled.div`
	padding: 20px 70px 38px 70px;
	width: 275px;
	height: 80px;
	font-size: 18px;
	font-weight: 600;
	cursor: pointer;
	margin-bottom: 14px;
	background-color: ${(props) => (props.active ? "transparent" : "#EDD0C2")};
`;

const FormContainer = styled.div`
	padding-left: 35px;
	padding-right: 35px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	width: 480px;
	height: 60px;
	border-bottom: solid 1px var(--color-orange);
	margin-bottom: 6px;
`;

const Button = styled.button`
	background-color: var(--color-maroon);
	width: 480px;
	height: 60px;
	border-radius: 10px;
	font-size: 18px;
	color: white;
	margin-top: 30px;
	font-weight: 700;
`;

export default LoginPage;
