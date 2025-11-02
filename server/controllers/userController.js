import { hash, compare } from 'bcrypt';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { createToken } from '../utils/tokenManager.js';
import { COOKIE_NAME } from '../utils/constants.js';

class userController {
	async getAllUsers(req, res) {
		try {
			const users = await User.find();
			return res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async userSignup(req, res) {
		try {
			const { login, email, password } = req.body;

			const existingLogin = await User.findOne({ login });
			if (existingLogin)
				return res.status(401).send('User with this login already exists');
			const existingEmail = await User.findOne({ email });
			if (existingEmail)
				return res.status(401).send('User with this email already exists');

			const role = await Role.findOne({ name: 'user' });
			if (!role) return res.status(401).send('Role not found');

			// const hashedPassword = await hash(password, 10);

			const user = await User.create({ ...req.body, role_id: role._id }); //add hashedPassword as password

			res.clearCookie(COOKIE_NAME, {
				path: '/',
				domain: 'localhost',
				httpOnly: true,
				signed: true,
			});

			const token = createToken(
				user._id.toString(),
				user.login,
				user.email,
				'7d'
			);
			const expires = new Date();
			expires.setDate(expires.getDate() + 7);

			res.cookie(COOKIE_NAME, token, {
				path: '/',
				domain: 'localhost',
				httpOnly: true,
				signed: true,
				expires,
			});
			console.log('user ' + login + ' created');
			return res.status(200).json({
				id: user._id,
				login: user.login,
				email: user.email,
				role: role.name,
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async userLogin(req, res) {
		try {
			console.log(req.body);
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) return res.status(401).send('User not registered');
			const role = await Role.findById(user.role_id);
			// const isPasswordCorrect = await compare(password, user.password);
			// if(!isPasswordCorrect) return res.status(403).send("Incorect password")

			if (password !== user.password)
				return res.status(403).send('Incorect password');

			res.clearCookie(COOKIE_NAME, {
				path: '/',
				domain: 'localhost',
				httpOnly: true,
				signed: true,
			});

			const token = createToken(
				user._id.toString(),
				user.login,
				user.email,
				'7d'
			);
			const expires = new Date();
			expires.setDate(expires.getDate() + 7);

			res.cookie(COOKIE_NAME, token, {
				path: '/',
				domain: 'localhost',
				httpOnly: true,
				signed: true,
				expires,
			});

			return res.status(200).json({
				id: user._id,
				login: user.login,
				email: user.email,
				role: role.name,
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async verifyUser(req, res) {
		try {
			const user = await User.findById(res.locals.jwtData.id);
			if (!user)
				return res.status(401).send('User not registered or token error');
			if (user._id.toString() !== res.locals.jwtData.id)
				res.status(401).send('Permissions did not match');

			const role = await Role.findById(user.role_id);
			return res.status(200).json({
				id: user._id,
				login: user.login,
				email: user.email,
				role: role.name,
			});
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}

	async userLogout(req, res) {
		try {
			const user = await User.findById(res.locals.jwtData.id);
			if (!user)
				return res.status(401).send('User not registered or token error');
			if (user._id.toString() !== res.locals.jwtData.id)
				res.status(401).send('Permissions did not match');

			res.clearCookie(COOKIE_NAME, {
				path: '/',
				domain: 'localhost',
				httpOnly: true,
				signed: true,
			});

			return res
				.status(200)
				.json({ message: "You've been successfully logged out" });
		} catch (error) {
			return res.status(500).json({ message: error.message });
		}
	}
}

export default userController;
