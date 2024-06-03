'use client';

import { useLayoutEffect, useState } from 'react';
import { Divider } from '@nextui-org/react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import { getAllChats } from '@/heplers/api';

export default function ChatLayout({ children }) {
	const [chats, setChats] = useState([]);

	const auth = useAuth();
	useLayoutEffect(() => {
		getAllChats().then((data) => {
			setChats(data);
		});
	}, [auth]);

	return (
		<div className="flex wrap gap-1 h-screen w-screen">
			<Sidebar chats={chats} />
			<Divider orientation="vertical" />
			{children}
		</div>
	);
}
