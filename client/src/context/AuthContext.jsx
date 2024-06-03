'use client';

import { createContext, useLayoutEffect, useState, useContext } from 'react';
import {
	checkAuthStatus,
	loginUser,
	logoutUser,
	signupUser,
} from '@/heplers/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useLayoutEffect(() => {
		async function checkStatus() {
			const data = await checkAuthStatus();
			if (data) {
				setUser(data);
				setIsLoggedIn(true);
			}
		}
		checkStatus();
	}, []);

	const login = async (login, password) => {
		const data = await loginUser(login, password);
		if (data) {
			setUser(data);
			setIsLoggedIn(true);
		}
	};
	const signup = async (login, email, password) => {
		const data = await signupUser(login, email, password);
		if (data) {
			setUser(data);
			setIsLoggedIn(true);
		}
	};

	const logout = async () => {
		await logoutUser();
		setIsLoggedIn(false);
		setUser(null);
		window.location.reload();
	};

	const value = {
		user,
		isLoggedIn,
		login,
		signup,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
