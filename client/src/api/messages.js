import axios from 'axios';

// export const askNonAuth = async (history, message) => {
// 	try {
// 		// const res = await axios.post('/messages/ask', { history, message });
// 		const res = await axios.post('/messages/ask', {
// 			history: [],
// 			message:
// 				'Hello, i need to buy a modern laptop as a gift for my friend. What can you recomment me in range of 500$?',
// 		});
// 		if (res.status !== 200) {
// 			throw new Error('Unable to receive answer');
// 		}
// 		const data = await res.data;
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

export async function* streamingFetch(fetchcall) {
	const response = await fetchcall();
	// Attach Reader
	const reader = response.body.getReader();
	while (true) {
		// wait for next encoded chunk
		const { done, value } = await reader.read();
		// check if stream is done
		if (done) break;
		// Decodes data chunk and yields it
		yield new TextDecoder().decode(value);
	}
}

export async function* streamTest(data) {
	console.log('streamTest');

	const response = await fetch('http://localhost:3001/api/messages/ask', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	console.log(response);

	const reader = response.body.getReader();

	while (true) {
		// wait for next encoded chunk
		const { done, value } = await reader.read();
		// check if stream is done
		if (done) break;
		// Decodes data chunk and yields it
		yield new TextDecoder().decode(value);
	}
}

export const askWithAuth = async (history, message, chat_id) => {
	try {
		const res = await axios.post('/messages/askAndSave', {
			history,
			message,
			chat_id,
		});
		if (res.status !== 200) {
			throw new Error('Unable to receive answer');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllChatMessages = async (chat_id) => {
	try {
		const res = await axios.get(`/messages/${chat_id}/`);
		if (res.status !== 200) {
			throw new Error('Error while receiving messages');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};
