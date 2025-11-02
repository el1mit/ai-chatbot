import express from 'express';
import messageController from '../controllers/messageController.js';
import { verifyToken } from '../utils/tokenManager.js';

const messageRouter = express.Router();
const MessageController = new messageController();

messageRouter.get('/:id', MessageController.getAllMessagesByChat);
messageRouter.post('/ask', MessageController.responseWithoutSave);
messageRouter.post(
	'/askAndSave',
	verifyToken,
	MessageController.responseWithSave
);

export default messageRouter;
