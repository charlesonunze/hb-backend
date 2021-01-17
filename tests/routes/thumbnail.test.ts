import { expect } from 'chai';
import sharp from 'sharp';
import request from 'supertest';

import app from '../../src/app';
import { apiEndpoint } from './constants';

describe('THUMBNAIL ROUTE', () => {
	let token: string;
	const url = 'https://unsplash.com/photos/dwjfddeDBZs/download?force=true';

	beforeEach(async () => {
		const loginResponse = await request(app)
			.post(apiEndpoint + '/login')
			.send({ username: 'charles', password: '1234' });

		token = loginResponse.body.data.token;
	});

	afterEach((done) => {
		app.close();
		done();
	});

	describe('POST /api/v1/thumbnail/create', () => {
		it('should return a 50x50 pixel thumbnail', async () => {
			const res = await request(app)
				.post(apiEndpoint + `/thumbnail/create?url=${url}`)
				.set('x-auth-token', token)
				.buffer(true);

			const { width, height } = await sharp(res.body).metadata();

			expect(res.status).to.equal(201);
			expect(res.headers['content-type']).to.equal('image/jpeg');
			expect(width).to.equal(50);
			expect(height).to.equal(50);
		});

		it('should throw an error if url was not provided', async () => {
			const res = await request(app)
				.post(apiEndpoint + `/thumbnail/create`)
				.set('x-auth-token', token)
				.buffer(true);

			expect(res.status).to.equal(422);
			expect(res.body.success).to.equal(false);
		});

		it('should throw an error if url is invalid', async () => {
			const res = await request(app)
				.post(
					apiEndpoint +
						`/thumbnail/create?url=https://unsplash.com/404/y0u5halln07pa55`
				)
				.set('x-auth-token', token)
				.buffer(true);

			expect(res.status).to.equal(404);
			expect(res.body.success).to.equal(false);
		});
	});
});
