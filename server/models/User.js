const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
		login: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		role_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('User', UserSchema);
