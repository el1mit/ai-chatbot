const express = require('express');
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../utils/tokenManager');

const chatRouter = express.Router();
const ChatController = new chatController();

chatRouter.get('/', verifyToken, ChatController.getAllUserChats);
chatRouter.post('/', verifyToken, ChatController.createChat);
chatRouter.put('/:id', ChatController.updateChat);
chatRouter.delete('/:id', verifyToken, ChatController.deleteChat);

module.exports = chatRouter;
