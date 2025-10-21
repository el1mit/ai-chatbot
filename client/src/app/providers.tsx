'use client';

// import axios from 'axios';
import { useState } from 'react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/providers/theme-provider';
// import { AuthProvider } from '@/context/authContext';

// axios.defaults.baseURL = 'http://localhost:3001/api/';
// axios.defaults.withCredentials = true;

export function Providers({ children }: { children: React.ReactNode }) {
	// const [queryClient] = useState(() => new QueryClient());
	return (
		// <QueryClientProvider client={queryClient}>
		// 	<AuthProvider>
		<ThemeProvider
			attribute="class"
			defaultTheme="dark"
			// enableSystem
			// disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
		// 	</AuthProvider>
		// </QueryClientProvider>
	);
}
