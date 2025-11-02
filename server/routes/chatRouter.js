import express from 'express';
import chatController from '../controllers/chatController.js';
import messageController from '../controllers/messageController.js';
import { verifyToken } from '../utils/tokenManager.js';

const chatRouter = express.Router();
const ChatController = new chatController();

chatRouter.get('/', verifyToken, ChatController.getAllUserChats);
chatRouter.post('/', verifyToken, ChatController.createChat);
chatRouter.put('/:id', ChatController.updateChat);
chatRouter.delete('/:id', verifyToken, ChatController.deleteChat);

export default chatRouter;
