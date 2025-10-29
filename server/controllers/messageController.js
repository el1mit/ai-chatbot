const Chat = require('../models/Chat');
const Message = require('../models/Message');
const GoogleGenAI = require('@google/genai').GoogleGenAI;

async function generateResponse(data) {
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });
	const chat = ai.chats.create({
		model: 'models/gemini-2.5-flash-preview-04-17',
		config: {
			systemInstruction: `You are a customer service assistant for an online electronics store.
				You should help customers with their questions about the products they are buying, 
				or give an technical support.`,
		},
		history: data.history,
	});

	const response = await chat.sendMessageStream({
		message: data.message,
	});

	return response;
}

class messageController {
	async getAllMessagesByChat(req, res) {
		try {
			const chat_id = req.params.id;
			const messages = await Message.find({ chat_id });
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
				res.write(chunk.text);
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

			// const text = await generateResponse();
			//save user question
			const question = await Message.create({
				content: req.body.message,
				answer: false,
				chat_id: req.body.chat_id,
				user_id: res.locals.jwtData.id,
			});

			// generate and send stream for response
			let answerText = '';
			const response = await generateResponse(req.body);
			for await (const chunk of response) {
				answerText += chunk.text;
				res.write(chunk.text);
			}

			const answer = await Message.create({
				content: answerText,
				answer: true,
				chat_id: req.body.chat_id,
				user_id: res.locals.jwtData.id,
			});

			res.end();

			// return res.status(200).json(text);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = messageController;
