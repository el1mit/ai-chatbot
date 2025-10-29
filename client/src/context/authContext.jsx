'use client';
import { createContext, useState, useContext, useEffect } from 'react';
import { checkAuthStatus } from '@/api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [userLoading, setUserLoading] = useState(false);
	const [userError, setUserError] = useState(false);

	useEffect(() => {
		async function checkUser() {
			try {
				setUserLoading(true);
				const user = await checkAuthStatus();
				if (user) {
					setUser(user);
					setUserLoading(false);
				}
			} catch (error) {
				setUserLoading(false);
				setUserError(error);
			}
		}
		checkUser();
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, userLoading, userError }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
