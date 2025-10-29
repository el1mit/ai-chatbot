import axios from 'axios';

export const loginUser = async (email, password) => {
	try {
		console.log({ email, password });
		const res = await axios.post('/users/login', { email, password });

		if (res.status !== 200) {
			throw new Error('Login error');
		}

		const respose = await res.data;
		return respose;
	} catch (error) {
		throw new Error(error.response.data || error);
	}
};

export const signupUser = async (login, email, password) => {
	try {
		const res = await axios.post('/users/signup', { login, email, password });
		if (res.status !== 200) {
			throw new Error('Signup error');
		}
		const data = await res.data;
		return data;
	} catch (error) {
		throw new Error(error.response.data || error);
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
		throw new Error(error.response.data.message || error);
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
		throw new Error(error.response.data || error);
	}
};
