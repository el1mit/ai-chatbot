'use client';

import axios from 'axios';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/context/AuthContext';

axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.withCredentials = true;

export function Providers({ children }) {
	return (
		<AuthProvider>
			<NextUIProvider>{children}</NextUIProvider>
		</AuthProvider>
	);
}
