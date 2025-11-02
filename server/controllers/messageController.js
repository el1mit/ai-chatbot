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
	const chat = LMStudioChat.empty();
	while (history.length > 0) {
		const element = history.shift();
		chat.append(element.answer ? 'system' : 'user', element.content);
	}
	chat.append('user', message);
	const response = model.respond(chat, {
		temperature: 0.2,
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
	client = new LMStudioClient({ baseUrl: process.env.AI_SERVICE_URL });

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
			console.log(req.body);
			// res.writeHead(200, {
			// 	'Content-Type': 'text/plain',
			// 	'Transfer-Encoding': 'chunked',
			// });

			const response = await generateResponse(req.body);
			for await (const chunk of response) {
				res.write(chunk.content);
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
			res.write('Start of the answer. ');
			answerText += 'Start of the answer. ';
			res.write('Part 1 of the answer. ');
			answerText += 'Part 1 of the answer. ';
			res.write('Part 2 of the answer. ');
			answerText += 'Part 2 of the answer. ';
			res.write('Part 3 of the answer. ');
			answerText += 'Part 3 of the answer. ';
			res.write('End of the answer. ');
			answerText += 'End of the answer. ';

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
