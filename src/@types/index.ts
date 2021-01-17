import { Response } from 'express';

export interface ResponseParams {
	res: Response;
	message?: string;
	filePath?: string;
	data?: anyObject;
	statusCode?: number;
}

export type anyObject = Record<string, unknown>;
