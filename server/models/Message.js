const mongoose = require('mongoose');

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

module.exports = mongoose.model('Message', MessageSchema);
