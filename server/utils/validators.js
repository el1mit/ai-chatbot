// const { body, validationResult } = require('express-validator');
import { body, validationResult } from 'express-validator';

const validate = (validations) => {
	return async (req, res, next) => {
		for (let validation of validations) {
			const result = await validation.run(req);
			if (!result.isEmpty()) {
				break;
			}
		}
		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		return res.status(422).json({ errors: errors.array() });
	};
};

const loginValidator = [
	body('email').notEmpty().isEmail().withMessage('Invalid email'),

	body('password')
		.notEmpty()
		.isLength({ min: 5, max: 16 })
		.withMessage('Password must be between 8 and 16 characters'),
];

const signupValidator = [
	body('login')
		.notEmpty()
		.isLength({ min: 5, max: 12 })
		.withMessage('Login must be between 6 and 12 characters'),
	...loginValidator,
];

export { validate, loginValidator, signupValidator };
