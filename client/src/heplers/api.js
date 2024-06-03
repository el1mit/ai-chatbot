import axios from 'axios';

// User
export const loginUser = async (login, password) => {
	try {
		const res = await axios.post('/users/login', {
			login,
			password,
		});
		if (res.status !== 200) {
			throw new Error('Login error');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const signupUser = async (login, email, password) => {
	try {
		const res = await axios.post('/users/signup', {
			login,
			email,
			password,
		});
		if (res.status !== 200) {
			throw new Error('Signup error');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const checkAuthStatus = async () => {
	try {
		const res = await axios.get('/users/auth-status');
		if (res.status !== 200) {
			throw new Error('Unable to authenticate');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = async () => {
	try {
		const res = await axios.get('/users/logout');
		if (res.status !== 200) {
			throw new Error('Logout error');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

// Messages
export const askNonAuth = async (history, message) => {
	try {
		const res = await axios.post('/messages/ask', { history, message });
		if (res.status !== 200) {
			throw new Error('Unable to receive answer');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const askWithAuth = async (history, message, chat_id) => {
	try {
		const res = await axios.post('/messages/askAndSave', {
			history,
			message,
			chat_id,
		});
		if (res.status !== 200) {
			throw new Error('Unable to receive answer');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllChatMessages = async (chat_id) => {
	try {
		const res = await axios.get(`/messages/${chat_id}/`);
		if (res.status !== 200) {
			throw new Error('Error while receiving messages');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

//Chats
export const getAllChats = async () => {
	try {
		const res = await axios.get('/chats/');
		if (res.status !== 200) {
			throw new Error('Error while receiving chats');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const createNewChat = async (title) => {
	try {
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
