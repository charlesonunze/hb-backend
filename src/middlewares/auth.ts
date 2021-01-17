import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { JWT_PRIVATE_KEY } from '../config';
import { UnauthorizedError, UserError } from '../utils/errorHandler';

export default function (req: Request, res: Response, next: NextFunction) {
	const token = req.header('x-auth-token');

	if (!token) {
		throw new UnauthorizedError(
			'Access denied. You need to be logged in to perform this action.'
		);
	}

	try {
		jwt.verify(token, JWT_PRIVATE_KEY);
		next();
	} catch (error) {
		throw new UserError('Invalid token.');
	}
}
