import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const res = await axios.get('/products/');
		if (res.status !== 200) {
			throw new Error('Error while receiving products');
		}
		const data = await res.data;
		return data || [];
	} catch (error) {
		console.log(error);
	}
};

export const createNewProduct = async (title) => {
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

export const editProduct = async (chat_id, title) => {
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

export const deleteProduct = async (chat_id) => {
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
