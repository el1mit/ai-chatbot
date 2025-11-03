import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

import { LMStudioClient, Chat as LMStudioChat } from '@lmstudio/sdk';

async function generateResponse(client, history = [], message = '') {
	// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
	// const chat = ai.chats.create({
	// 	model: 'models/gemini-2.5-flash-preview-04-17',
	// 	config: {
	// 		systemInstruction: `You are a customer service assistant for an online electronics store.
	// 			You should help customers with their questions about the products they are buying,
	// 			or give an technical support.`,
	// 	},
	// 	history: data.history,
	// });
	const model = await client.llm.model(process.env.MODEL);
	console.log(process.env.MODEL);
	const chat = LMStudioChat.empty();
	while (history.length > 0) {
		const element = history.shift();
		chat.append(element.answer ? 'system' : 'user', element.content);
	}
	chat.append('user', message);
	const response = await model.respond(chat, {
		temperature: 0.8,
	});

	// for await (const fragment of response) {
	// 	process.stdout.write(fragment.content);
	// }

	// const response = await chat.sendMessageStream({
	// 	message: data.message,
	// });
	// const history = [
	// 	{ role: 'user', content: 'hello' },
	// 	{ role: 'system', content: 'hello, im an cutomer service assistant' },
	// ];

	// const response = await model.respond(history);
	return response;
}

class messageController {
	async getAllMessagesByChat(req, res) {
		try {
			const chat_id = req.params.id;
			const chat = await Chat.findById(chat_id);
			if (!chat) return res.status(404).json({ message: 'Chat not found' });
			const messages = chat.messages;
			// const messages = await Message.find({ chat_id });
			return res.status(200).json(messages);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async responseWithoutSave(req, res) {
		try {
			const client = new LMStudioClient({
				baseUrl: process.env.AI_SERVICE_URL,
			});
			// res.writeHead(200, {
			// 	'Content-Type': 'text/plain',
			// 	'Transfer-Encoding': 'chunked',
			// });

			// const response = await generateResponse(
			// 	client,
			// 	req.body.history,
			// 	req.body.message
			// );

			const model = await client.llm.model(process.env.MODEL);

			const chat = LMStudioChat.empty();
			while (req.body.history.length > 0) {
				const element = req.body.history.shift();
				chat.append(element.answer ? 'system' : 'user', element.content);
			}
			chat.append('user', req.body.message);
			const response = model.respond(chat, {
				temperature: 0.8,
			});

			const delimiter = '<|channel|>final<|message|>';
			let buffer = '';
			let prefixFound = false;

			for await (const { content } of response) {
				if (prefixFound) {
					res.write(content);
				} else {
					buffer += content;
					const delimiterIndex = buffer.indexOf(delimiter);
					if (delimiterIndex !== -1) {
						prefixFound = true;

						// 8. Extract *only* the content *after* the delimiter.
						const actualMessage = buffer.substring(
							delimiterIndex + delimiter.length
						);

						// 9. Write this first part of the actual message.
						if (actualMessage.length > 0) {
							res.write(actualMessage);
						}

						// 10. Clear the buffer; we don't need it anymore.
						buffer = '';
					}
				}
				console.log(content);
				// res.write(content);
			}

			// for await (const chunk of response) {
			// 	console.log(chunk.content);
			// 	res.write(chunk.content);
			// }

			res.end();
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async responseWithSave(req, res) {
		try {
			const chat = await Chat.findById(req.body.chat_id);
			if (!chat) return res.status(404).json({ message: 'Chat not found' });
			const messages = chat.messages;

			//save user question
			const question = await Message.create({
				content: req.body.content,
				answer: false,
				chat_id: chat._id,
				user_id: res.locals.jwtData.id,
			});

			// generate and send stream for response
			let answerText = '';
			// const response = await generateResponse(this.client, messages, req.body.message);
			// for await (const chunk of response) {
			// 	answerText += chunk.content;
			// 	res.write(chunk.content);
			// }

			const answer = await Message.create({
				content: answerText,
				answer: true,
				chat_id: chat._id,
				user_id: res.locals.jwtData.id,
			});

			await chat.updateOne({ $push: { messages: [question, answer] } });
			res.end();

			// return res.status(200).json(text);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

export default messageController;
