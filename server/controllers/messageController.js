import Chat from '../models/Chat.js';
import Message from '../models/Message.js';

import { LMStudioClient, Chat as LMStudioChat } from '@lmstudio/sdk';

async function generateResponse(model, history = [], message = '') {
	const chat = LMStudioChat.empty();
	history.forEach((element) => {
		chat.append(element.answer ? 'system' : 'user', element.content);
	});
	chat.append('user', message);

	const response = await model.respond(chat, {
		temperature: 0.8,
	});

	return response;
}

class messageController {
	async getAllMessagesByChat(req, res) {
		try {
			const chat = await Chat.findById(req.params.id);
			if (!chat) return res.status(404).json({ message: 'Chat not found' });

			const messages = chat.messages;
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
			const model = await client.llm.model(process.env.AI_MODEL);

			const response = await generateResponse(
				model,
				req.body.history,
				req.body.message
			);

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

						// // 8. Extract *only* the content *after* the delimiter.
						// const actualMessage = buffer.substring(
						// 	delimiterIndex + delimiter.length
						// );

						// // 9. Write this first part of the actual message.
						// if (actualMessage.length > 0) {
						// 	res.write(actualMessage);
						// }

						// // 10. Clear the buffer; we don't need it anymore.
						// buffer = '';
					}
				}
				console.log(content);
			}

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
