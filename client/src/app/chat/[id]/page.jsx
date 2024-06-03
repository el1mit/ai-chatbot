'use client';

import { useState, useLayoutEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Card, Divider } from '@nextui-org/react';
import MessageForm from '@/components/MessageForm';
import { getAllChatMessages, askWithAuth } from '@/heplers/api';
import { useAuth } from '@/context/AuthContext';

export default function Messages({ params }) {
	const auth = useAuth();
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [messages, setMessages] = useState([]);
	const [messagesHistory, setMessagesHistory] = useState([]);

	useLayoutEffect(() => {
		getAllChatMessages(params.id).then((data) => {
			console.log(data);
			setMessages(data);

			data.map((element) => {
				console.log(element);
				if (!element.answer) {
					setMessagesHistory((prevState) => [
						...prevState,
						{ role: 'user', parts: [{ text: element.content }] },
					]);
				} else {
					setMessagesHistory((prevState) => [
						...prevState,
						{ role: 'model', parts: [{ text: element.content }] },
					]);
				}
			});
		});
		// async function check() {
		// 	const user = await auth.user;
		// 	if (!user) {
		// 		router.push('/chat');
		// 		return;
		// 	}
		// }
		// check();
	}, [auth]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');
		setMessages((prevState) => [
			...prevState,
			{ _id: Date.now(), answer: false, content: message },
		]);
		setMessagesHistory((prevState) => [
			...prevState,
			{ role: 'user', parts: [{ text: message }] },
		]);

		const answer = await askWithAuth(messagesHistory, message, params.id);

		if (answer) {
			setMessages((prevState) => [
				...prevState,
				{ _id: Date.now(), answer: true, content: answer },
			]);
			setMessagesHistory((prevState) => [
				...prevState,
				{ role: 'model', parts: [{ text: answer }] },
			]);
			setDisabled(false);
		}
	};

	return (
		<div className="grow-[999] basis-0 flex flex-col justify-between items-center *:w-2/3">
			<div className="flex flex-col h-full overflow-auto">
				{messages.map((message) => (
					<Card
						key={message._id}
						className={`${
							!message.answer && ' bg-orange-600'
						} flex items-center gap-4 p-3 mt-4 mx-4 overflow-visible`}
					>
						<ReactMarkdown>{message.content}</ReactMarkdown>
					</Card>
				))}
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
