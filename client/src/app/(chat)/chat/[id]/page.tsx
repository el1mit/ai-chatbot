'use client';

import React, { useState, useEffect } from 'react';

type PageProps = {
	params: {
		id: string;
	};
};

type ChatMessage = {
	sender: 'user' | 'bot';
	text: string;
};

const Page = ({ params }: PageProps) => {
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [newMessage, setNewMessage] = useState('');

	useEffect(() => {
		const fetchChatHistory = async () => {
			setLoading(true);
			setError(null);
			try {
				// Simulate API call to fetch chat history for the given id
				await new Promise((resolve) => setTimeout(resolve, 1000));

				// In a real application, you would fetch data like this:
				// const response = await fetch(`/api/chat/${params.id}`);
				// if (!response.ok) {
				//   throw new Error('Failed to fetch chat history');
				// }
				// const data = await response.json();
				// setChatHistory(data.history);

				// Using mock data for demonstration
				const mockHistory: ChatMessage[] = [
					{ sender: 'user', text: 'Hello!' },
					{
						sender: 'bot',
						text: `Hi there! This is chat ${params.id}. How can I help you?`,
					},
				];
				setChatHistory(mockHistory);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : 'An unknown error occurred'
				);
			} finally {
				setLoading(false);
			}
		};

		if (params.id) {
			fetchChatHistory();
		}
	}, [params.id]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newMessage.trim()) return;
		// Handle sending the new message to the server
		console.log('Sending message:', newMessage);
		// Add message to local state for immediate feedback
		setChatHistory([...chatHistory, { sender: 'user', text: newMessage }]);
		setNewMessage('');
	};

	if (loading) {
		return <div>Loading chat history...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
			<h1>Chat session: {params.id}</h1>
			<div
				style={{
					flex: 1,
					overflowY: 'auto',
					border: '1px solid #ccc',
					padding: '10px',
					marginBottom: '10px',
				}}
			>
				{chatHistory.map((message, index) => (
					<div key={index} style={{ marginBottom: '5px' }}>
						<strong>{message.sender}:</strong> {message.text}
					</div>
				))}
			</div>
			<form onSubmit={handleSubmit} style={{ display: 'flex' }}>
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder="Type your message..."
					style={{ flex: 1, padding: '8px', marginRight: '8px' }}
				/>
				<button type="submit" style={{ padding: '8px 16px' }}>
					Send
				</button>
			</form>
		</div>
	);
};

export default Page;
