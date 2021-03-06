import { components } from './components';

import { loginDocs } from './auth';
import { jsonPatchDocs } from './jsonPatch';
import { thumbnailDocs } from './thumbnail';

const swaggerDocs = {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'HACKERBAY BACKEND TEST',
		description: 'Official documentation for HACKERBAY BACKEND TEST.'
	},
	schemes: [],
	servers: [
		{
			url: '/api/v1',
			description: 'Development Server'
		}
	],

	paths: {
		'/login': loginDocs,
		'/patch-json': jsonPatchDocs,
		'/thumbnail/create': thumbnailDocs
	},

	components: components
};

export { swaggerDocs };
