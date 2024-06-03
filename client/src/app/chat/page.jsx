'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Divider } from '@nextui-org/react';
import MessageForm from '@/components/MessageForm';
import { createNewChat, askWithAuth } from '@/heplers/api';
import { useAuth } from '@/context/AuthContext';

export default function FullscreenChat() {
	const auth = useAuth();
	const router = useRouter();
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [messagesHistory, setMessagesHistory] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');

		const chat = await createNewChat('New Chat');
		const answer = await askWithAuth(messagesHistory, message, chat._id);
		console.log(chat, answer);
		if (chat && answer) {
			setDisabled(false);
			router.push(`/chat/${chat._id}`);
		}
	};

	return (
		<div className="grow-[999] basis-0 flex flex-col justify-between items-center *:w-2/3">
			<div className="flex grow justify-center items-center">
				Send message to start new chat
			</div>
			<div className="flex flex-col items-center">
				<Divider />
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
