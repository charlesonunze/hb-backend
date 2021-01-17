import Joi, { ValidationError as InputError } from 'joi';
import { ValidationError } from '../utils/errorHandler';
import { anyObject } from '../@types';

export const handleValidationError = (error: InputError) => {
	const { details } = error;
	const errorMessage = details[0].message;
	throw new ValidationError(errorMessage);
};

export const validateLoginInput = (data: anyObject) => {
	const schema = Joi.object({
		username: Joi.string().trim().required(),
		password: Joi.string().trim().required()
	});

	return schema.validate(data);
};
