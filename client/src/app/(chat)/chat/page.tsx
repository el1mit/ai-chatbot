'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import MessageForm from '@/components/MessageForm';
import { useAuth } from '@/context/authContext';
// import { createNewChat } from '@/api/chat';
// import { askWithAuth } from '@/api/messages';
import { useQueryClient } from '@tanstack/react-query';

function FullscreenChat() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { user } = useAuth();
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		setDisabled(!user);
	}, [user]);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	): Promise<void> => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');

		// Create new chat first with empty messages array then get chat id to nawigate to new chat page
		// pass the message to new chat page and get streaming response there

		// const chat = await createNewChat('New Chat');
		// const answer = await askWithAuth(message, chat._id);

		// if (chat && answer) {
		// 	setDisabled(false);
		// 	queryClient.invalidateQueries({ queryKey: ['chats'] });
		// 	router.push(`/chat/${chat._id}`);
		// }
	};

	return (
		<div className="grow-[999] basis-0 flex flex-col justify-between items-center *:w-2/3">
			<div className="flex grow justify-center items-center">
				Send message to start new chat
			</div>
			<div className="flex flex-col items-center">
				<Separator />
				<MessageForm
					message={message}
					setMessage={setMessage}
					handleSubmit={handleSubmit}
					disabled={disabled}
				/>
			</div>
		</div>
	);
}

export default FullscreenChat;
