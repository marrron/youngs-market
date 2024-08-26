import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import iconCheckBox from "../assets/images/icon-check-box.svg";
import iconCheckFillBox from "../assets/images/icon-check-fill-box.svg";
import iconCheckOn from "../assets/images/icon-check-on.svg";
import iconUpArrow from "../assets/images/icon-up-arrow.svg";

const SignUpBox = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [name, setName] = useState("");
	const [firstDigit, setFirstDigit] = useState("010");
	const [middleDigit, setMiddleDigit] = useState("");
	const [lastDigit, setLastDigit] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [idValidationMessage, setIdValidationMessage] = useState("");
	const [messageColor, setMessageColor] = useState("");
	const [checked, setChecked] = useState(false);
	const [isValidationPassword, setIsValidationPassword] = useState(false);
	const [passwordMatchMessage, setPasswordMatchMessage] = useState("");
	const [selectDigits, setSelectDigits] = useState("010");
	const [isOpen, setIsOpen] = useState(false);
	const [companyNumber, setCompanyNumber] = useState("");
	const [useremail, setUserEmail] = useState("");
	const [domain, setDomain] = useState("");

	const navigate = useNavigate();
	const firstDigits = ["010", "011", "016", "017", "018", "019"];
	const email = `${useremail}@${domain}`;

	const handleTabClick = (index) => {
		setActiveTab(index);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const phone_number = `${firstDigit}${middleDigit}${lastDigit}`;

		const AuthData = {
			username,
			password,
			password2,
			phone_number,
			name,
			email,
		};

		localStorage.setItem("userEmail", email);
		localStorage.setItem("userName", username);

		axios
			.post("https://openmarket.weniv.co.kr/accounts/signup/", AuthData)
			.then((response) => {
				console.log("회원가입 성공:", response.data);
				navigate("/");
			})
			.catch((error) => {
				if (error.response) {
					console.log("회원가입 실패:", error.response.data);
					setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
					navigate("/signup");
				}
			});
	};

	const handleIdValidation = (event) => {
		event.preventDefault();

		if (username === "") {
			setIdValidationMessage("아이디를 입력해주세요.");
			setMessageColor("var(--color-red)");
			return;
		}

		const AuthData = {
			username,
		};

		axios
			.post(
				"https://openmarket.weniv.co.kr/accounts/signup/valid/username/",
				AuthData
			)
			.then((response) => {
				console.log("성공", response.data);
				setIdValidationMessage("멋진 아이디네요 :)");
				setMessageColor("var(--color-maroon");
			})
			.catch((error) => {
				if (error.response) {
					console.log("실패", error.response.data);
					setIdValidationMessage("이미 사용중인 아이디 입니다.");
					setMessageColor("var(--color-red)");
				}
			});
	};

	const handleCheck = () => {
		setChecked(!checked);
	};

	const handlePasswordValidation = (password) => {
		const minLenth = password.length >= 8;
		const lowerCase = /[a-z]/.test(password);
		const minNumber = /\d/.test(password);

		if (minLenth && lowerCase && minNumber) {
			setIsValidationPassword(true);
		} else {
			setIsValidationPassword(false);
		}
	};

	const comparePassword = (e) => {
		const value = e.target.value;
		setPassword2(value);

		if (value !== password) {
			setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
		} else {
			setPasswordMatchMessage("");
		}
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleDigitClick = (option) => {
		setSelectDigits(option);
		setIsOpen(false);
	};

	const isButtonEnabled = () => {
		const phone_number = `${firstDigit}${middleDigit}${lastDigit}`;
		return (
			username &&
			password &&
			password2 &&
			name &&
			phone_number.length === 11 &&
			checked
		);
	};

	const handleCompanyNumberCheck = (event) => {
		event.preventDefault();
		const company_registration_number = { companyNumber };

		const AuthData = {
			company_registration_number,
		};

		axios
			.post(
				"https://openmarket.weniv.co.kr/accounts/signup/valid/company_registration_number/",
				AuthData
			)
			.then((response) => {
				console.log("성공", response.data);
				navigate("/signup");
			})
			.catch((error) => {
				if (error.response) {
					console.log("실패", error.response.data);
					navigate("/signup");
				}
			});
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
						<Form onSubmit={handleSubmit}>
							<p>아이디</p>
							<InpBtnGroup>
								<input
									type="text"
									placeholder=""
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
										setIdValidationMessage("");
									}}
									required
									style={{
										border:
											messageColor === "var(--color-red)"
												? "1px solid var(--color-red)"
												: "1px solid var(--color-orange)",
									}}
								/>
								<button onClick={handleIdValidation}>중복확인</button>
							</InpBtnGroup>
							{idValidationMessage && (
								<p style={{ color: messageColor }}>{idValidationMessage}</p>
							)}
							<p>비밀번호</p>
							<PasswordContainer>
								<Input
									type="password"
									placeholder=""
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										handlePasswordValidation(e.target.value);
									}}
									required
								/>
								{isValidationPassword && <img src={iconCheckOn} alt="" />}
							</PasswordContainer>
							<p>비밀번호 재확인</p>
							<PasswordContainer>
								<Input
									type="password"
									placeholder=""
									value={password2}
									onChange={comparePassword}
									required
									style={{
										border: passwordMatchMessage
											? "1px solid var(--color-red)"
											: "1px solid var(--color-orange)",
									}}
								/>
							</PasswordContainer>
							{passwordMatchMessage && (
								<p style={{ color: "var(--color-red)" }}>
									{passwordMatchMessage}
								</p>
							)}
							<p>이름</p>
							<Input
								type="text"
								placeholder=""
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<p>휴대폰번호</p>
							<PhoneNumber>
								<SelectNumber>
									<div onClick={toggleDropdown}>
										{selectDigits} <img src={iconUpArrow} alt="" />
									</div>
									{isOpen && (
										<ul>
											{firstDigits.map((option, index) => (
												<li
													key={index}
													onClick={() => handleDigitClick(option)}
													style={{
														padding: "10px",
														cursor: "pointer",
														textAlign: "center",
													}}
												>
													{option}
												</li>
											))}
										</ul>
									)}
								</SelectNumber>
								<input
									type="text"
									value={middleDigit}
									onChange={(e) => {
										const value = e.target.value;
										if (/^\d*$/.test(value) && value.length <= 4) {
											setMiddleDigit(value);
										}
									}}
								/>
								<input
									type="text"
									value={lastDigit}
									onChange={(e) => {
										const value = e.target.value;
										if (/^\d*$/.test(value) && value.length <= 4) {
											setLastDigit(value);
										}
									}}
								/>
							</PhoneNumber>
							<p>이메일</p>
							<Email>
								<input
									type="text"
									value={useremail}
									onChange={(e) => setUserEmail(e.target.value)}
								/>
								@
								<input
									type="text"
									value={domain}
									onChange={(e) => setDomain(e.target.value)}
								/>
							</Email>
						</Form>
					) : (
						<Form onSubmit={handleSubmit}>
							<p>아이디</p>
							<InpBtnGroup>
								<input
									type="text"
									placeholder=""
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
										setIdValidationMessage("");
									}}
									required
									style={{
										border:
											messageColor === "var(--color-red)"
												? "1px solid var(--color-red)"
												: "1px solid var(--color-orange)",
									}}
								/>
								<button onClick={handleIdValidation}>중복확인</button>
							</InpBtnGroup>
							{idValidationMessage && (
								<p style={{ color: messageColor }}>{idValidationMessage}</p>
							)}
							<p>비밀번호</p>
							<PasswordContainer>
								<Input
									type="password"
									placeholder=""
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										handlePasswordValidation(e.target.value);
									}}
									required
								/>
								{isValidationPassword && <img src={iconCheckOn} alt="" />}
							</PasswordContainer>
							<p>비밀번호 재확인</p>
							<PasswordContainer>
								<Input
									type="password"
									placeholder=""
									value={password2}
									onChange={comparePassword}
									required
									style={{
										border: passwordMatchMessage
											? "1px solid var(--color-red)"
											: "1px solid var(--color-orange)",
									}}
								/>
							</PasswordContainer>
							{passwordMatchMessage && (
								<p style={{ color: "var(--color-red)" }}>
									{passwordMatchMessage}
								</p>
							)}
							<p>이름</p>
							<Input
								type="text"
								placeholder=""
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<p>휴대폰번호</p>
							<PhoneNumber>
								<SelectNumber>
									<div onClick={toggleDropdown}>
										{selectDigits} <img src={iconUpArrow} alt="" />
									</div>
									{isOpen && (
										<ul className="seller">
											{firstDigits.map((option, index) => (
												<li
													key={index}
													onClick={() => handleDigitClick(option)}
													style={{
														padding: "10px",
														cursor: "pointer",
														textAlign: "center",
													}}
												>
													{option}
												</li>
											))}
										</ul>
									)}
								</SelectNumber>
								<input
									type="text"
									value={middleDigit}
									onChange={(e) => {
										const value = e.target.value;
										if (/^\d*$/.test(value) && value.length <= 4) {
											setMiddleDigit(value);
										}
									}}
								/>
								<input
									type="text"
									value={lastDigit}
									onChange={(e) => {
										const value = e.target.value;
										if (/^\d*$/.test(value) && value.length <= 4) {
											setLastDigit(value);
										}
									}}
								/>
							</PhoneNumber>
							<p>이메일</p>
							<Email>
								<input type="text" />
								@
								<input type="text" />
							</Email>
							<p style={{ marginTop: "50px" }}>사업자 등록번호</p>
							<InpBtnGroup>
								<input
									type="text"
									value={companyNumber}
									onChange={(e) => setCompanyNumber(e.target.value)}
									required
								/>
								<button onClick={handleCompanyNumberCheck}>인증</button>
							</InpBtnGroup>
							<p>스토어 이름</p>
							<Input type="text" placeholder="" required />
						</Form>
					)}
				</FormContainer>
			</SignUpContainer>
			<Terms>
				<img
					src={checked ? iconCheckFillBox : iconCheckBox}
					alt=""
					onClick={handleCheck}
				/>
				<p>
					호두샵의 <u style={{ fontWeight: 700 }}>이용약관</u> 및{" "}
					<u style={{ fontWeight: 700 }}>개인정보처리방침</u>에 대한 내용을
					확인하였고 동의합니다.
				</p>
			</Terms>
			<Join>
				<button
					type="submit"
					onClick={handleSubmit}
					style={{
						backgroundColor: isButtonEnabled()
							? "var(--color-maroon)"
							: "var(--color-orange)",
					}}
				>
					가입하기
				</button>
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
	position: relative;
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
	p:nth-child(15) {
		margin-top: 4px;
	}
`;

const InpBtnGroup = styled.div`
	display: flex;
	width: 480px;
	margin-bottom: 12px;
	justify-content: space-between;

	input {
		width: 346px;
		height: 54px;
		border: solid 1px var(--color-orange);
		border-radius: 5px;
		padding-left: 16px;
	}

	button {
		width: 122px;
		height: 54px;
		background-color: var(--color-maroon);
		border-radius: 5px;
		color: white;
		font-size: 16px;
	}
`;

const Input = styled.input`
	width: 480px;
	height: 54px;
	border: solid 1px var(--color-orange);
	border-radius: 5px;
	margin-bottom: 12px;
	font-size: 16px;
	padding-left: 16px;
`;

const PasswordContainer = styled.div`
	position: relative;

	img {
		position: absolute;
		top: 13px;
		right: 16px;
		width: 28px;
		height: 28px;
	}
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
		padding-left: 16px;
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
		padding-left: 16px;
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

const SelectNumber = styled.div`
	div {
		width: 152px;
		height: 54px;
		border: 1px solid var(--color-orange);
		border-radius: 5px;
		cursor: pointer;
		font-size: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		justify-content: space-between;
		padding: 17px 16px 17px 50px;
	}
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		border: 1px solid var(--color-orange);
		max-height: 150px;
		overflow-y: auto;
		border-radius: 5px;
		position: absolute;
		width: 152px;
		background-color: #fff;
		top: 80%;

		/* 스크롤 스타일 */
		::-webkit-scrollbar {
			width: 20px;
		}

		::-webkit-scrollbar-track {
			background-color: rgba(0, 0, 0, 0);
		}

		::-webkit-scrollbar-thumb {
			background-color: var(--color-grey);
			border-radius: 10px;
			border: 6px solid var(--color-white);
		}
	}
	.seller {
		top: 57.5%;
	}
`;

export default SignUpBox;
