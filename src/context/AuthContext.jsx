// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => {
		return localStorage.getItem("token") || null;
	});

	const [loginType, setLoginType] = useState(() => {
		return localStorage.getItem("loginType") || null;
	});

	const updateToken = (newToken) => {
		setToken(newToken);
		if (newToken) {
			localStorage.setItem("token", newToken);
		} else {
			localStorage.removeItem("token");
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
