// const mongoose = require('mongoose');
import mongoose from 'mongoose';

async function connectToDatabase() {
	try {
		await mongoose.connect(process.env.MONGODB_URL);
		console.log('Connected to database');
	} catch (error) {
		console.log(error);
		throw new Error('Failed to connect to database');
	}
}

async function disconnectFromDatabase() {
	try {
		await mongoose.disconnect();
		console.log('Disconnected from database');
	} catch (error) {
		console.log(error);
		throw new Error('Failed to disconnect from database');
	}
}

export { connectToDatabase, disconnectFromDatabase };
