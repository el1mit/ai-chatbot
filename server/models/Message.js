import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		answer: {
			type: Boolean,
			required: true,
		},
		chat_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Chat',
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Message', MessageSchema);
