import axios from 'axios';

export const getAllChats = async () => {
	try {
		const res = await axios.get('/chats/');
		if (res.status !== 200) {
			throw new Error('Error while receiving chats');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		throw new Error(error.response.data.message || error);
	}
};

export const createNewChat = async (title) => {
	try {
		console.log(title);
		const res = await axios.post('/chats/', { title });
		if (res.status !== 200) {
			throw new Error('Error while creatin chat');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const renameChat = async (chat_id, title) => {
	try {
		const res = await axios.put(`/chats/${chat_id}`, { title });
		if (res.status !== 200) {
			throw new Error('Error while renaming chat');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteChat = async (chat_id) => {
	try {
		const res = await axios.delete(`/chats/${chat_id}`);
		if (res.status !== 200) {
			throw new Error('Error while deleting chat');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};
