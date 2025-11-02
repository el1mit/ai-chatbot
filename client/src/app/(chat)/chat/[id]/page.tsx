'use client';

import { useState, useEffect, use } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import MessageForm from '@/components/MessageForm';
import ReactMarkdown from 'react-markdown';
import { getAllChatMessages, streamingFetch } from '@/api/messages';

type ChatPageProps = {
	params: {
		id: string;
	};
};

type ChatHistory = {
	_id: number;
	answer: boolean;
	content: string;
};

export default function Messages({ params }: ChatPageProps) {
	const { id } = params;
	const [message, setMessage] = useState('');
	const [answer, setAnswer] = useState('');
	const [messages, setMessages] = useState<ChatHistory[]>([]);
	const [disabled, setDisabled] = useState(false);

	useEffect(() => {
		getAllChatMessages(id).then((data) => {
			console.log(data);
			setMessages(data);

			// data.map((element: ChatHistory) => {
			// 	console.log(element);
			// 	setMessagesHistory((prevState) => [
			// 		...prevState,
			// 		{
			// 			role: element.answer ? 'system' : 'user',
			// 			content: element.content,
			// 		},
			// 	]);
			// 	// if (!element.answer) {
			// 	// 	setMessagesHistory((prevState) => [
			// 	// 		...prevState,
			// 	// 		{ role: 'user', parts: [{ text: element.content }] },
			// 	// 	]);
			// 	// } else {
			// 	// 	setMessagesHistory((prevState) => [
			// 	// 		...prevState,
			// 	// 		{ role: 'model', parts: [{ text: element.content }] },
			// 	// 	]);
			// 	// }
			// });
		});
	}, [id]);

	const handleSubmit = async (
		event: React.MouseEvent<HTMLButtonElement>
	): Promise<void> => {
		event.preventDefault();
		let chunkedAnswer = '';
		setDisabled(true);
		setMessage('');
		setAnswer('');

		setMessages((prevState) => [
			...prevState,
			{ _id: Date.now(), answer: false, content: message },
		]);

		for await (const chunk of streamingFetch(() =>
			fetch('http://localhost:3001/api/messages/askAndSave', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					content: message,
					chat_id: params.id,
				}),
			})
		)) {
			console.log(chunk);
			setAnswer((prev) => prev + chunk);
			chunkedAnswer += chunk;
		}

		setMessages((prevState) => [
			...prevState,
			{ _id: Date.now(), answer: true, content: chunkedAnswer },
		]);
		setDisabled(false);
		setAnswer('');
	};

	return (
		<div className="flex flex-col items-center w-full h-full">
			<div className="flex flex-col grow w-full px-48 overflow-y-auto scroll-smooth">
				{messages.map((message) => (
					<Card
						key={message._id}
						className={`${
							!message.answer && 'self-end bg-primary text-primary-foreground'
						} max-w-2/3 flex gap-4 p-3 mt-4 mx-4 overflow-visible`}
					>
						<ReactMarkdown>{message.content}</ReactMarkdown>
					</Card>
				))}
				{answer && (
					<Card className="max-w-2/3 p-3 mt-4 mx-4 overflow-visible">
						<ReactMarkdown>{answer}</ReactMarkdown>
					</Card>
				)}
			</div>
			<div className="flex flex-col items-center mt-4 w-2/3">
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
