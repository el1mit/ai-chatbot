const OpenAI = require('openai');

const openai = new OpenAI({
	apiKey: 'sk-proj-9HEAB9OKqOON1zaSCZawT3BlbkFJru6ijZtvQsdRoQgvwnUh',
});

const start = async () => {
	// Create a new thread
	// const thread = await openai.beta.threads.create();
	// console.log(thread.id);
	// Add a message to the thread
	// const message = await openai.beta.threads.messages.create(thread.id, {
	// 	role: 'user',
	// 	content:
	// 		'i have problems with my computer. It isnt runnig but speaker is givin 2 short signals. Can you help me?',
	// });
	// Create a new run
	// const run = await openai.beta.threads.runs.create(thread.id, {
	// 	assistant_id: 'asst_GrT6m52zbtB6PQsUY7OVtVYP',
	// });
	// console.log(run);
	// Retrieve a run
	// const run = await openai.beta.threads.runs.retrieve(
	// 	'thread_qL3KQab9Dwxn7pPDfpxvc1bi',
	// 	'run_TpOpDxeCxOsvTVlr6GeOR5Dy'
	// );
	// console.log(run);
	// Retrieve messages
	// const messages = await openai.beta.threads.messages.list(
	// 	'thread_QXLQSMHBO05HOHdFhlayatk2'
	// );
	// Console log the messages
	// messages.body.data.forEach((message) => {
	// 	console.log(message.content);
	// });
};

start();
