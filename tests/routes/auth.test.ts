import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../../src/app';
import { JWT_PRIVATE_KEY } from '../../src/config';
import { apiEndpoint } from './constants';

describe('LOGIN ROUTE', () => {
	const loginDetails = {
		username: 'username',
		password: 'password'
	};

	afterEach((done) => {
		app.close();
		done();
	});

	describe('POST /api/v1/login', () => {
		it('should return a valid jwt', async () => {
			const res = await request(app)
				.post(apiEndpoint + '/login')
				.send(loginDetails);

			const { token } = res.body.data;
			const payload = jwt.verify(token, JWT_PRIVATE_KEY);

			expect(res.status).to.equal(200);
			expect(res.body.success).to.equal(true);
			expect(res.body.data).to.have.property('token');
			expect(payload).to.have.property('username');
			expect(payload).to.have.property('password');
		});

		it('should throw an error if input data is invalid', async () => {
			delete loginDetails.password;

			const res = await request(app)
				.post(apiEndpoint + '/login')
				.send(loginDetails);

			expect(res.status).to.equal(422);
			expect(res.body.success).to.equal(false);
			expect(res.body.data).to.be.undefined;
		});
	});
});
