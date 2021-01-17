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

export const validateJsonInput = (data: anyObject) => {
	const jsonPatchSchema = Joi.object({
		op: Joi.string().required(),
		path: Joi.string().required(),
		value: Joi.string().required()
	});

	const schema = Joi.object({
		originalDocument: Joi.object().required(),
		patchDocument: Joi.array().items(jsonPatchSchema)
	});

	return schema.validate(data);
};

export const validateQueryParams = (data: anyObject) => {
	const schema = Joi.object({
		url: Joi.string().required()
	});

	return schema.validate(data);
};
