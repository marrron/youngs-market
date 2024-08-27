// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    // 로컬 스토리지에서 토큰 가져오기
    return localStorage.getItem("token") || null;
  });

  const [loginType, setLoginType] = useState(() => {
    // 로컬 스토리지에서 토큰 가져오기
    return localStorage.getItem("loginType") || null;
  });

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken); // 토큰을 로컬 스토리지에 저장
    } else {
      localStorage.removeItem("token"); // 로그아웃 시 토큰 제거
    }
  };

  const updateLoginType = (newLoginType) => {
    setLoginType(newLoginType);
    if (newLoginType) {
      localStorage.setItem("loginType", newLoginType);
    } else {
      localStorage.removeItem("loginType");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: updateToken,
        loginType,
        setLoginType: updateLoginType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
