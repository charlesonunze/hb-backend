import axios from 'axios';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { UserError, NotFoundError } from '../utils/errorHandler';

async function downloadImage(url: string, folder: string, filePath: string) {
	if (!existsSync(folder)) mkdirSync(folder);

	try {
		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream'
		});

		const writeStream = await response.data.pipe(createWriteStream(filePath));

		return writeStream;
	} catch (error) {
		if (error.code === 'EAI_AGAIN')
			throw new UserError('Please check your internet connection.');

		if (error.code === 'ECONNREFUSED')
			throw new UserError(
				'URL is not valid. Please check your url and try again.'
			);

		if (error.response.status === 404)
			throw new NotFoundError(
				'Could not find the image. Please check your url and try again.'
			);
	}
}

export { downloadImage };
