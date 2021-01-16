import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import { JWT_PRIVATE_KEY } from '../config';
import { sendResponse } from '../utils/response';
import { validateLoginInput, handleValidationError } from '../validators';

class AuthController {
	login: RequestHandler = async (req, res) => {
		const { error, value: userInfo } = validateLoginInput(req.body);

		if (error) return handleValidationError(error);

		const token = jwt.sign(userInfo, JWT_PRIVATE_KEY, { expiresIn: '3h' });

		return sendResponse({
			res,
			data: { token },
			message: 'Login successful.'
		});
	};
}

export default AuthController;
