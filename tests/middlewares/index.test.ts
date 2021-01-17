import jwt from 'jsonwebtoken';
import { expect } from 'chai';
import { createRequest, createResponse } from 'node-mocks-http';

import auth from '../../src/middlewares/auth';
import { apiEndpoint } from '../routes/constants';
import { JWT_PRIVATE_KEY } from '../../src/config';

describe('MIDDLEWARES', () => {
	const userDetails = { username: 'charles', password: 'password' };
	const token = jwt.sign(userDetails, JWT_PRIVATE_KEY);
	const request = createRequest({
		method: 'POST',
		url: apiEndpoint + '/patch',
		headers: {
			'x-auth-token': token
		},
		body: {}
	});
	const response = createResponse();

	afterEach((done) => {
		done();
	});

	describe('authMiddleware', () => {
		it('should allow acces to a protected route', () => {
			auth(request, response, () => null);

			expect(response.statusCode).to.equal(200);
		});

		it('should deny access if token is invalid', () => {
			request.headers['x-auth-token'] = 'token';
			expect(() => auth(request, response, () => null)).to.throw();
		});

		it('should deny access if token is not provided', () => {
			delete request.headers['x-auth-token'];
			expect(() => auth(request, response, () => null)).to.throw();
		});
	});
});
