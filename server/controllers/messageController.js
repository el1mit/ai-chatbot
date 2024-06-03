const Chat = require('../models/Chat');
const Message = require('../models/Message');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function generateResponse(data) {
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
	const model = genAI.getGenerativeModel({
		model: 'models/gemini-1.5-pro-latest',
	});

	const chat = model.startChat({ history: data.history });
	const result = await chat.sendMessage(data.message);
	const response = await result.response;
	return response.text();
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
			const text = await generateResponse(req.body);
			return res.status(200).json(text);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async responseWithSave(req, res) {
		try {
			const chat = await Chat.findById(req.body.chat_id);
			if (!chat) return res.status(404).json({ message: 'Chat not found' });

			const text = await generateResponse({
				history: req.body.history,
				message: req.body.message,
			});

			const question = await Message.create({
				content: req.body.message,
				answer: false,
				chat_id: req.body.chat_id,
				user_id: res.locals.jwtData.id,
			});

			const answer = await Message.create({
				content: text,
				answer: true,
				chat_id: req.body.chat_id,
				user_id: res.locals.jwtData.id,
			});

			return res.status(200).json(text);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

module.exports = messageController;
