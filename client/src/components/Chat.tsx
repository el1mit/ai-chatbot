'use client';

import { useState } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import {
	Card,
	CardHeader,
	CardContent,
	CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import MessageForm from '@/components/MessageForm';
// import { streamingFetch } from '@/api/messages';

type ChatProps = {
	visible: boolean;
	onClick: () => void;
};

type Message = {
	role: 'user' | 'model';
	parts: Array<{ text: string }>;
};
type MessagesHistory = Array<Message>;

export default function Chat({ visible, onClick }: ChatProps) {
	const [message, setMessage] = useState<string>('');
	const [answer, setAnswer] = useState<string>('');
	const [disabled, setDisabled] = useState<boolean>(false);
	const [messagesHistory, setMessagesHistory] = useState<MessagesHistory>([]);

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement>
	): Promise<void> => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');
		setAnswer('');
		setMessagesHistory((prevState) => [
			...prevState,
			{ role: 'user', parts: [{ text: message }] },
		]);

		// let chunkedAnswer = '';
		// for await (const chunk of streamingFetch(() =>
		// 	fetch('http://localhost:3001/api/messages/ask', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify({ history: messagesHistory, message }),
		// 	})
		// )) {
		// 	setAnswer((prev) => prev + chunk);
		// 	chunkedAnswer += chunk;
		// }
		const chunkedAnswer = 'Some streamed answer.';
		setMessagesHistory((prevState) => [
			...prevState,
			{ role: 'model', parts: [{ text: chunkedAnswer }] },
		]);

		setDisabled(false);
		setAnswer('');

		// if (answer) {
		// 	setMessagesHistory((prevState) => [
		// 		...prevState,
		// 		{ role: 'model', parts: [{ text: answer }] },
		// 	]);
		// 	setDisabled(false);
		// }
	};

	return (
		<Card
			className={`${
				visible ? 'flex' : 'hidden'
			} w-[35vw] h-[80vh] flex-col justify-between`}
		>
			<CardHeader className="flex flex-col gap-2">
				<div className="flex flex-row w-full justify-end gap-2">
					<Button asChild>
						<Link href="/chat">Open fullscreen chat</Link>
					</Button>

					<Button onClick={onClick}>Close chat</Button>
				</div>
				<Separator />
			</CardHeader>

			<CardContent className="flex flex-col h-full overflow-auto">
				{messagesHistory.map((message, id) => (
					<Card
						key={id}
						className={`${
							message.role === 'user' &&
							'self-end bg-primary text-primary-foreground'
						} max-w-[85%] w-max flex flex-col gap-3 p-4 mx-4 my-2 overflow-visible`}
					>
						<ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
					</Card>
				))}
				{answer && (
					<Card className="w-[85%] flex flex-col gap-3 p-4 mx-4 my-2 overflow-visible">
						<ReactMarkdown>{answer}</ReactMarkdown>
					</Card>
				)}
			</CardContent>

			<CardFooter className="flex flex-col">
				<Separator />
				<MessageForm
					message={message}
					setMessage={setMessage}
					handleSubmit={handleSubmit}
					disabled={disabled}
				/>
			</CardFooter>
		</Card>
	);
}
