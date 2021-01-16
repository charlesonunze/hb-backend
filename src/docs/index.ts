import { components } from './components';

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
			url: '/api',
			description: 'Development Server'
		}
	],

	paths: {},

	components: components
};

export { swaggerDocs };
