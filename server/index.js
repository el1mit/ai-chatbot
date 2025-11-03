import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';

import { connectToDatabase } from './utils/db.js';
import userRouter from './routes/userRouter.js';
import roleRouter from './routes/roleRouter.js';
import messageRouter from './routes/messageRouter.js';
import chatRouter from './routes/chatRouter.js';
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		credentials: true,
		optionsSuccessStatus: 200,
	})
);

app.use('/api/messages', messageRouter);
app.use('/api/chats', chatRouter);
app.use('/api/users', userRouter);
app.use('/api/roles', roleRouter);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

connectToDatabase()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((error) => console.log(error));

// try {
// 	app.listen(port, () => {
// 		console.log(`Server is running on port ${port}`);
// 	});
// } catch (error) {
// 	console.log(error);
// }
