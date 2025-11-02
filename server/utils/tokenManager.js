// const jwt = require('jsonwebtoken');
// const { COOKIE_NAME } = require('./constants');
import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';

const createToken = (id, login, email, expiresIn = '7d') => {
	const payload = { id, login, email };
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn,
	});
	return token;
};

const verifyToken = async (req, res, next) => {
	const token = req.signedCookies[COOKIE_NAME];

	if (!token || token.trim() === '')
		return res.status(401).json({ message: 'Token not received' });

	return new Promise((resolve, reject) => {
		return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
			if (err) {
				reject(err.message);
				return res.status(401).json({ message: 'Token expired' });
			} else {
				resolve();
				res.locals.jwtData = success;
				return next();
			}
		});
	});
};

export { createToken, verifyToken };
