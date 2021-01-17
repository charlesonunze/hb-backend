import sharp from 'sharp';
import { resolve } from 'path';
import { RequestHandler } from 'express';
import cryptoRandomString from 'crypto-random-string';

import { sendFile } from '../utils/response';
import { UserError } from '../utils/errorHandler';
import { downloadImage } from '../services/download';
import { validateQueryParams, handleValidationError } from '../validators';

class ThumbnailController {
	create: RequestHandler = async (req, res) => {
		const { error, value } = validateQueryParams(req.query);

		if (error) return handleValidationError(error);

		const { url } = value;

		const folder = resolve('./src', 'images');
		const fileName = cryptoRandomString({ length: 5 });
		const downloadFilePath = resolve(folder, fileName + '.jpg');
		const thumbnailFilePath = resolve(folder, fileName + '-thumbnail.jpg');

		const writeStream = await downloadImage(url, folder, downloadFilePath);

		writeStream.on('close', async () => {
			const result = await sharp(downloadFilePath)
				.resize({
					width: 50,
					height: 50
				})
				.toFile(thumbnailFilePath);

			if (!result) throw new UserError('Something bad happened.');

			return sendFile({ res, filePath: thumbnailFilePath });
		});
	};
}

export default ThumbnailController;
