// const Chat = require('../models/Chat');
import Chat from '../models/Chat.js';

class chatController {
	async getAllUserChats(req, res) {
		try {
			const chats = await Chat.find({ user_id: res.locals.jwtData.id });
			return res.status(200).json(chats);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async createChat(req, res) {
		try {
			const chat = await Chat.create({
				user_id: res.locals.jwtData.id,
				title: req.body.title,
				messages: [],
			});

			return res.status(200).json(chat);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async updateChat(req, res) {
		try {
			const { id } = req.params;
			const chat = await Chat.findByIdAndUpdate(id, req.body);
			if (!chat) {
				return res.status(404).json({ message: 'Chat not found' });
			}

			const updatedChat = await Chat.findById(id);
			return res.status(200).json(updatedChat);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async deleteChat(req, res) {
		try {
			await Chat.deleteOne({ _id: req.params.id });
			return res.status(200).end();
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

export default chatController;
