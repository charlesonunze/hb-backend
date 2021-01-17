import { expect } from 'chai';
import {
	handleValidationError,
	validateJsonInput,
	validateLoginInput,
	validateQueryParams
} from '../../src/validators';

describe('INPUT VALIDATORS', () => {
	afterEach((done) => {
		done();
	});

	describe('validateLoginInput', () => {
		it('should validate user input', () => {
			const invalidData = { username: 'username' };
			const validData = {
				username: 'username',
				password: 'password'
			};

			const failed = validateLoginInput(invalidData);
			const passed = validateLoginInput(validData);

			expect(passed.error).to.equal(undefined);
			expect(failed.error!.message).to.equal(`"password" is required`);
		});
	});

	describe('validateJsonInput', () => {
		it('should validate user input', () => {
			const invalidData = { name: 'charles' };
			const validData = {
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

			const failed = validateJsonInput(invalidData);
			const passed = validateJsonInput(validData);

			expect(passed.error).to.equal(undefined);
			expect(failed.error!.message).to.equal(`"originalDocument" is required`);
		});
	});

	describe('validateQueryParams', () => {
		it('should validate user input', () => {
			const invalidData = { uri: 'invalid url' };
			const validData = {
				url: 'https://unsplash.com/photos/dwjfddeDBZs/download?force=true'
			};

			const failed = validateQueryParams(invalidData);
			const passed = validateQueryParams(validData);

			expect(passed.error).to.equal(undefined);
			expect(failed.error!.message).to.equal(`"url" is required`);
		});
	});

	describe('handleValidationError', () => {
		it('should handle validation errors', () => {
			const invalidData = {};

			const { error } = validateLoginInput(invalidData);

			expect(() => handleValidationError(error!)).to.throw();
		});
	});
});
