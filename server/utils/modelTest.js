import { LMStudioClient, Chat } from '@lmstudio/sdk';
import { performance } from 'perf_hooks';
import * as fs from 'fs';

import 'dotenv/config';
function getModelResponse(model, history, message) {
	const chat = Chat.empty();
	history.forEach((element) => {
		chat.append(element.answer ? 'assistant' : 'user', element.content);
	});
	chat.append('user', message);

	const response = model.respond(chat, {
		temperature: 0.8,
	});
	return response;
}

async function getAndLogAiResponse(history, message) {
	const client = new LMStudioClient({
		baseUrl: process.env.AI_SERVICE_URL,
	});
	const model = await client.llm.model(process.env.AI_MODEL);

	const startTime = performance.now();
	const responseStream = getModelResponse(model, history, message);

	let fullGeneratedResponse = '';

	for await (const { content } of responseStream) {
		fullGeneratedResponse += content;
	}

	const endTime = performance.now();
	const durationInMs = endTime - startTime;

	// --- Logging ---
	const logMessage = `
=================================================
Timestamp: ${new Date().toISOString()}
Duration: ${durationInMs.toFixed(2)} ms
History: ${JSON.stringify(history, null, 2)}
User Message: ${message}
Full AI Response: ${fullGeneratedResponse}
=================================================
`;

	// Option 1: Log to console
	console.log('--- AI Response Log ---');
	console.log(logMessage);

	// Option 2: Log to a file (e.g., 'ai_responses.log')
	// Using appendFile for asynchronous logging
	try {
		// Use fs.promises.appendFile
		await fs.promises.appendFile('ai_responses.log', logMessage);
	} catch (logError) {
		console.error('Failed to write to log file:', logError);
	}
	// --- End Logging ---
}
// --- END NEW FUNCTION ---

const testData = [
	// test 1
	{
		history: [],
		message:
			'Як я можу скинути пароль від свого облікового запису на вашому сайті?',
	},
	//test 2
	{
		history: [],
		message: 'Які у вас години роботи технічної підтримки у вихідні дні?',
	},
	//test 3
	{
		history: [],
		message: 'Яка гарантія на ноутбук моделі AstraBook Pro 15?',
	},
	//test 4
	{
		history: [],
		message: 'Як я можу перевірити статус мого замовлення №98765?',
	},
	//test 5
	{
		history: [],
		message:
			'Чи можу я повернути товар, якщо він мені не підійшов, і яка процедура повернення?',
	},
	//test 6
	{
		history: [],
		message:
			'Мій новий принтер друкує з білими смугами. Це гарантійний випадок?',
	},
	//test 7
	{
		history: [
			{
				answer: false,
				content: 'Добрий день. Я купив у вас монітор ViewSonic XG24',
			},
			{ answer: true, content: 'Вітаю! Чим можу допомогти?' },
		],
		message:
			'Я не можу знайти, як увімкнути режим 144Hz. Де це в налаштуваннях?',
	},
	//test 8
	{
		history: [
			{
				answer: false,
				content: 'Мій ноутбук AstraBook не вмикається',
			},
			{
				answer: true,
				content:
					'Будь ласка, спробуйте затиснути кнопку живлення на 15 секунд. Чи допомогло це?',
			},
		],
		message:
			'Ні, не допомогло. Індикатор зарядки горить, але екран залишається чорним',
	},
	//test 9
	{
		history: [
			{
				answer: false,
				content: 'Я оформив заявку на ремонт №10542',
			},
			{
				answer: true,
				content:
					'Згідно з нашими даними, Ваша заявка №10542 знаходиться в діагностичному центрі',
			},
		],
		message: 'Як довго зазвичай триває діагностика?',
	},
	//test 10
	{
		history: [],
		message:
			'Вітаю. У мене серйозна проблема з Wi-Fi на новому ноутбуці, який я купив у вас минулого тижня. З’єднання постійно зникає кожні 15-20 хвилин. На моєму телефоні та іншому старому комп’ютері інтернет через цей же роутер працює стабільно. Я вже оновив драйвери з офіційного сайту, але це не допомогло. Що це може бути?',
	},
];

for (const data of testData) {
	await getAndLogAiResponse(data.history, data.message);
}
