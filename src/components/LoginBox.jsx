import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";

const LoginBox = () => {
  const user = auth.currentUser;
  const { setToken, setLoginType } = useAuth(); // Context에서 setToken 가져오기
  const [activeTab, setActiveTab] = useState("BUYER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleTabClick = (type) => {
    setActiveTab(type);
    setEmail("");
    setPassword("");
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 방지
    setErrorMessage("");

    if (email === "" || password === "") return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log(user.accessToken);
      setToken(user.accessToken);
      setLoginType(activeTab);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setErrorMessage(e.message);
        console.log(e.code, e.message);
      }
    } finally {
    }
  };

  return (
    <>
      <TabContainer>
        <Tab
          active={activeTab === "BUYER"}
          onClick={() => handleTabClick("BUYER")}
        >
          구매회원 로그인
        </Tab>
        <Tab
          active={activeTab === "SELLER"}
          onClick={() => handleTabClick("SELLER")}
        >
          판매회원 로그인
        </Tab>
      </TabContainer>
      <LoginContainer>
        <FormContainer>
          {activeTab === "BUYER" ? (
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ErrorMessage marginTop={errorMessage ? "26px" : ""}>
                {errorMessage}
              </ErrorMessage>
              <Button type="submit">로그인</Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ErrorMessage marginTop={errorMessage ? "26px" : ""}>
                {errorMessage}
              </ErrorMessage>
              <Button type="submit">로그인</Button>
            </Form>
          )}
        </FormContainer>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  margin: 0 auto;
  /* margin-top: -7px; */
  padding-top: 44px;
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
  padding: 20px 70px 38px 70px;
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
  margin-bottom: 36px;
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  font-size: 16px;
  margin-top: ${(props) => props.marginTop};
  color: red;
`;

export default LoginBox;
