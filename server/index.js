// import { LMStudioClient } from '@lmstudio/sdk';

// const client = new LMStudioClient({ baseUrl });
// const MODEL = 'openai/gpt-oss-20b';

// async function askQuestion(question) {
// 	const model = await client.llm.model(MODEL);
// 	const result = await model.respond(question);
// 	return result;
// }

// askQuestion('What can you help with?').then(console.info);

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const { connectToDatabase } = require('./utils/db');
const userRouter = require('./routes/userRouter');
const roleRouter = require('./routes/roleRouter');
const messageRouter = require('./routes/messageRouter');
const chatRouter = require('./routes/chatRouter');
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
