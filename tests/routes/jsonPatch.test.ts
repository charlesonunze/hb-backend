import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';
import { apiEndpoint } from './constants';

describe('JSON PATCH ROUTE', () => {
	let token: string;
	const payload = {
		originalDocument: {
			name: 'charles'
		},
		patchDocument: [
			{
				op: 'replace',
				path: '/name',
				value: 'daniel'
			}
		]
	};

	beforeEach(async () => {
		const loginResponse = await request(app)
			.post(apiEndpoint + '/login')
			.send({ username: 'username', password: 'password' });

		token = loginResponse.body.data.token;
	});

	afterEach((done) => {
		app.close();
		done();
	});

	describe('PATCH /api/v1/patch-json', () => {
		it('should return a patched json object', async () => {
			const res = await request(app)
				.patch(apiEndpoint + '/patch-json')
				.set('x-auth-token', token)
				.send(payload);

			expect(res.status).to.equal(200);
			expect(res.body.success).to.equal(true);
			expect(res.body.data.patchedDocument.name).to.equal('daniel');
		});

		it('should throw an error if path does not exist', async () => {
			payload.patchDocument[0].path = '/you shall not pass!';

			const res = await request(app)
				.patch(apiEndpoint + '/patch-json')
				.set('x-auth-token', token)
				.send(payload);

			expect(res.status).to.equal(400);
			expect(res.body.success).to.equal(false);
		});

		it('should throw an error if input data is invalid', async () => {
			delete payload.patchDocument[0].path;

			const res = await request(app)
				.patch(apiEndpoint + '/patch-json')
				.set('x-auth-token', token)
				.send(payload);

			expect(res.status).to.equal(422);
			expect(res.body.success).to.equal(false);
		});
	});
});
