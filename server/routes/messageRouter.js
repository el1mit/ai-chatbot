const express = require('express');
const messageController = require('../controllers/messageController');
const { verifyToken } = require('../utils/tokenManager');

const messageRouter = express.Router();
const MessageController = new messageController();

messageRouter.get('/:id', MessageController.getAllMessagesByChat);
messageRouter.post('/ask', MessageController.responseWithoutSave);
messageRouter.post(
	'/askAndSave',
	verifyToken,
	MessageController.responseWithSave
);

module.exports = messageRouter;
