import mongoose from 'mongoose';
import Message from './Message.js';

const ChatSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		messages: [Message.schema],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Chat', ChatSchema);
