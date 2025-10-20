'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import MessageForm from '@/components/MessageForm';
// import { useAuth } from '@/context/authContext';
// import { createNewChat } from '@/api/chat';
// import { askWithAuth } from '@/api/messages';
// import { useQueryClient } from '@tanstack/react-query';

function FullscreenChat() {
	// const queryClient = useQueryClient();
	const router = useRouter();
	// const { user } = useAuth();
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [messagesHistory, setMessagesHistory] = useState([]);

	// useEffect(() => {
	// 	setDisabled(!user);
	// }, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');

		// const chat = await createNewChat('New Chat');
		// const answer = await askWithAuth(messagesHistory, message, chat._id);

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
