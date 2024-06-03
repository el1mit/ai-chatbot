'use client';

import Link from 'next/link';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
} from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';
import MessageForm from './MessageForm';

import { askNonAuth } from '@/heplers/api';
import { useState } from 'react';
export default function Chat({ visible, onClick }) {
	const [message, setMessage] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [messagesHistory, setMessagesHistory] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);
		setMessage('');
		setMessagesHistory((prevState) => [
			...prevState,
			{ role: 'user', parts: [{ text: message }] },
		]);

		const answer = await askNonAuth(messagesHistory, message);

		if (answer) {
			setMessagesHistory((prevState) => [
				...prevState,
				{ role: 'model', parts: [{ text: answer }] },
			]);
			setDisabled(false);
		}
	};

	return (
		<Card
			className={`${
				visible ? 'flex' : 'hidden'
			} w-[35vw] h-[80vh] flex-col justify-between`}
		>
			<CardHeader className="flex flex-col gap-2">
				<div className="flex flex-row w-full justify-end gap-2">
					<Link href="/chat">
						<Button>Open fullscreen chat</Button>
					</Link>
					<Button onClick={onClick}>Close chat</Button>
				</div>
				<Divider />
			</CardHeader>

			<CardBody className="h-full overflow-auto">
				{messagesHistory.map((message, id) => (
					<Card
						key={id}
						className={`${
							message.role === 'user' && 'bg-orange-600'
						} flex flex-col gap-3 p-4 mx-4 my-2 overflow-visible`}
					>
						<ReactMarkdown>{message.parts[0].text}</ReactMarkdown>
					</Card>
				))}
			</CardBody>

			<CardFooter className="flex flex-col">
				<Divider />
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
