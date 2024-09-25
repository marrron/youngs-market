import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import iconCheckBox from "../assets/images/icon-check-box.svg";
import iconCheckFillBox from "../assets/images/icon-check-fill-box.svg";
import iconCheckOn from "../assets/images/icon-check-on.svg";
import iconUpArrow from "../assets/images/icon-up-arrow.svg";
import iconDownArrow from "../assets/images/icon-down-arrow.svg";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";

const SignUpBox = () => {
	const [activeTab, setActiveTab] = useState("BUYER");
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
	const [storeName, setStoreName] = useState("");
	const [isCompanyNumberValid, setIsCompanyNumberValid] = useState(false);
	const [storeNameError, setStoreNameError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailSuccessMessage, setEmailSuccessMessage] = useState("");

	const navigate = useNavigate();
	const firstDigits = ["010", "011", "016", "017", "018", "019"];
	const email = `${useremail}@${domain}`;

	const handleTabClick = (type) => {
		setActiveTab(type);
	};

	const handleSellerSubmit = async () => {
		const phone_number = `${firstDigit}${middleDigit}${lastDigit}`;
		const company_registration_number = companyNumber;
		const store_name = storeName;

		const credentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		console.log(credentials.user);
		await updateProfile(credentials.user, {
			displayName: name,
		});

		await setDoc(doc(db, "sellers", credentials.user.uid), {
			email: email,
			phone_number: phone_number,
			name: name,
			type: activeTab,
			company_registration_number: company_registration_number,
			store_name: store_name,
		});
		navigate("/login");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (activeTab === "BUYER") {
			const phone_number = `${firstDigit}${middleDigit}${lastDigit}`;

			try {
				const credentials = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
				console.log(credentials.user);
				await updateProfile(credentials.user, {
					displayName: name,
				});

				await setDoc(doc(db, "buyers", credentials.user.uid), {
					email: email,
					phone_number: phone_number,
					name: name,
					type: activeTab,
				});
				navigate("/login");
			} catch (e) {
				if (e.code === "auth/email-already-in-use") {
					setEmailError("이미 사용 중인 이메일입니다.");
					setEmailSuccessMessage("");
				} else {
					setErrorMessage("");
				}
				console.log(e.code, e.message);
			}
		} else {
			const storeNameExists = await checkStoreNameDuplicate(storeName);
			if (storeNameExists) {
				setStoreNameError("중복된 스토어 이름이 존재합니다.");
			} else if (isCompanyNumberValid) {
				handleSellerSubmit();
			} else {
				setStoreNameError("");
				setErrorMessage("사업자 등록번호를 먼저 인증해 주세요.");
			}
		}
	};

	const checkStoreNameDuplicate = async (storeName) => {
		const querySnapshot = await getDocs(
			query(collection(db, "sellers"), where("store_name", "==", storeName))
		);
		return !querySnapshot.empty;
	};

	const handleCheck = () => {
		setChecked(!checked);
	};

	const checkEmailDuplicate = async () => {
		const userEmail = `${useremail}@${domain}`;
		const collectionsToCheck = ["buyers", "sellers"];
		let isDuplicate = false;

		for (const collectionName of collectionsToCheck) {
			const querySnapshot = await getDocs(
				query(collection(db, collectionName), where("email", "==", userEmail))
			);
			if (!querySnapshot.empty) {
				isDuplicate = true;
				break;
			}
		}

		if (isDuplicate) {
			setEmailError("이미 사용 중인 이메일입니다.");
			setEmailSuccessMessage("");
		} else {
			setEmailError("");
			setEmailSuccessMessage("멋진 아이디네요 :)");
		}
	};

	const handlePasswordValidation = (password) => {
		const minLenth = password.length >= 6;
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
			password && password2 && name && phone_number.length === 11 && checked
		);
	};

	const handleCompanyNumberCheck = async (event) => {
		event.preventDefault();
		const company_registration_number = companyNumber;

		if (
			!company_registration_number ||
			company_registration_number.length !== 10
		) {
			setErrorMessage("사업자 등록번호는 10자리여야 합니다.");
			setIsCompanyNumberValid(false);
			return;
		}

		const querySnapshot = await getDocs(
			query(
				collection(db, "sellers"),
				where("company_registration_number", "==", company_registration_number)
			)
		);
		if (!querySnapshot.empty) {
			setErrorMessage("중복된 사업자 등록번호가 존재합니다.");
			setIsCompanyNumberValid(false);
		} else {
			setErrorMessage("");
			setIsCompanyNumberValid(true);
		}
	};

	return (
		<>
			<TabContainer>
				<Tab
					active={activeTab === "BUYER"}
					onClick={() => handleTabClick("BUYER")}
				>
					구매회원가입
				</Tab>
				<Tab
					active={activeTab === "SELLER"}
					onClick={() => handleTabClick("SELLER")}
				>
					판매회원가입
				</Tab>
			</TabContainer>
			<SignUpContainer>
				<FormContainer>
					{activeTab === "BUYER" ? (
						<Form onSubmit={handleSubmit}>
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
								<button type="button" onClick={checkEmailDuplicate}>
									중복확인
								</button>
							</Email>
							{emailError && <p style={{ color: "red" }}>{emailError}</p>}
							{emailSuccessMessage && (
								<p style={{ color: "#A25956" }}>{emailSuccessMessage}</p>
							)}
							<p className="password">비밀번호</p>
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
							<p style={{ marginTop: "50px" }}>이름</p>
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
										{selectDigits}{" "}
										<img src={isOpen ? iconUpArrow : iconDownArrow} alt="" />
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
						</Form>
					) : (
						<Form onSubmit={handleSubmit}>
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
								<button type="button" onClick={checkEmailDuplicate}>
									중복확인
								</button>
							</Email>
							{emailError && <p style={{ color: "red" }}>{emailError}</p>}
							{emailSuccessMessage && (
								<p style={{ color: "#A25956" }}>{emailSuccessMessage}</p>
							)}
							<p className="password">비밀번호</p>
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
							<p style={{ marginTop: "50px" }}>이름</p>
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
										{selectDigits}{" "}
										<img src={isOpen ? iconUpArrow : iconDownArrow} alt="" />
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

							<p style={{ marginTop: "50px" }}>사업자 등록번호</p>
							<InpBtnGroup>
								<input
									type="text"
									value={companyNumber}
									onChange={(e) => {
										const value = e.target.value;
										if (/^\d{0,10}$/.test(value)) {
											setCompanyNumber(value);
										}
									}}
									required
									maxLength={10}
								/>
								<button onClick={handleCompanyNumberCheck}>인증</button>
							</InpBtnGroup>
							<p style={{ color: "red" }}>{errorMessage}</p>
							<p>스토어 이름</p>
							<Input
								type="text"
								placeholder=""
								value={storeName}
								onChange={(e) => setStoreName(e.target.value)}
								required
							/>
							{storeNameError && (
								<p style={{ color: "red" }}>{storeNameError}</p>
							)}
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
	/* p:nth-child(6) {
		margin-top: 38px;
	} */
	p:nth-child(8) {
		margin-top: 4px;
	}
	p:nth-child(10) {
		margin-top: 4px;
	}
	p:nth-child(14) {
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
	margin-bottom: 12px;

	input {
		width: 160px;
		height: 54px;
		border: solid 1px var(--color-orange);
		border-radius: 5px;
		padding-left: 16px;
	}
	button {
		width: 100px;
		height: 54px;
		background-color: var(--color-maroon);
		border-radius: 5px;
		color: white;
		font-size: 16px;
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
		top: 92%;

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
		top: 64.5%;
	}
`;

export default SignUpBox;
