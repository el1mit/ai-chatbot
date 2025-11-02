'use client';

import { Separator } from '@/components/ui/separator';
import Sidebar from '@/components/Sidebar';
import { useState } from 'react';
import { getAllChats } from '@/api/chat';
import { useQuery } from '@tanstack/react-query';

type Chat = {
	_id: string;
	title: string;
};

function ChatLayout({ children }: { children: React.ReactNode }) {
	const { data, status } = useQuery({
		queryKey: ['chats'],
		queryFn: getAllChats,
	});
	// const status = 'success';

	// const [data, setData] = useState<Chat[]>([
	// 	{ _id: '1', title: 'Some chat' },
	// 	{
	// 		_id: '2',
	// 		title: 'One Two Three Number Some chat with long title to test sidebar',
	// 	},
	// ]);

	return (
		<div className="flex wrap gap-1 p-4 h-screen max-w-screen">
			<div className="flex flex-row">
				<Sidebar chats={data} status={status} />
				<Separator orientation="vertical" />
			</div>
			{children}
		</div>
	);
}

export default ChatLayout;
