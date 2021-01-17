import { resolve } from 'path';
import rimraf from 'rimraf';
import { existsSync } from 'fs';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import cryptoRandomString from 'crypto-random-string';

import { downloadImage } from '../../src/services/download';
import { logger } from '../../src/utils/main.logger';

chai.use(chaiAsPromised);

describe('SERVICES', () => {
	afterEach((done) => {
		done();
	});

	after((done) => {
		const filesToPurge = [
			resolve('./src', 'images-test'),
			resolve('./src', 'notfound')
		];
		rimraf(filesToPurge[0], (err: Error) => {
			logger.error(err);
		});
		rimraf(filesToPurge[1], (err: Error) => {
			logger.error(err);
		});
		done();
	});

	describe('downloadImage', () => {
		it('should download an image', async () => {
			const url = 'https://unsplash.com/photos/YWLfUzIm6YE/download?force=true';

			const folder = resolve('./src', 'images-test');
			const fileName = cryptoRandomString({ length: 5 });
			const downloadFilePath = resolve(folder, fileName + '.jpg');

			const writeStream = await downloadImage(url, folder, downloadFilePath);

			expect(writeStream.on).to.be.a('function');
			expect(existsSync(folder)).to.equal(true);
		});

		it('should create a new folder if folder name does not exist', async () => {
			const url = 'https://unsplash.com/photos/YWLfUzIm6YE/download?force=true';

			const folder = resolve('./src', 'notfound');
			const fileName = cryptoRandomString({ length: 5 });
			const downloadFilePath = resolve(folder, fileName + '.jpg');

			const writeStream = await downloadImage(url, folder, downloadFilePath);

			expect(writeStream.on).to.be.a('function');
			expect(existsSync(folder)).to.equal(true);
		});

		it('should throw an error if url is invalid', async () => {
			const url = '//unsplash.com/404/y0u5halln07pa55';

			const folder = resolve('./src', 'notfound');
			const fileName = cryptoRandomString({ length: 5 });
			const downloadFilePath = resolve(folder, fileName + '.jpg');

			await expect(
				downloadImage(url, folder, downloadFilePath)
			).to.be.rejectedWith(
				`URL is not valid. Please check your url and try again.`
			);
		});

		it('should throw an error if image cannot be found', async () => {
			const url =
				'https://unsplash.com/photosNOTFOUND/dwjfddeDBZs/download?force=true';

			const folder = resolve('./src', 'notfound');
			const fileName = cryptoRandomString({ length: 5 });
			const downloadFilePath = resolve(folder, fileName + '.jpg');

			await expect(
				downloadImage(url, folder, downloadFilePath)
			).to.be.rejectedWith(
				'Could not find the image. Please check your url and try again.'
			);
		});
	});
});
