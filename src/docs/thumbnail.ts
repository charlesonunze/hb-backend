export const thumbnailDocs = {
	post: {
		tags: ['THUMBNAIL GENERATION'],
		summary: 'Generate a 50x50 thumbnail from an image.',

		parameters: [
			{
				in: 'query',
				name: 'url',
				schema: {
					type: 'string'
				},
				description: 'URL of the image to be resized.',
				required: true
			},
			{
				in: 'header',
				name: 'x-auth-token',
				schema: {
					type: 'string'
				},
				required: true
			}
		],

		responses: {
			'200': {
				description: 'Success response',
				content: {
					'image/jpg': {
						schema: {
							type: 'string',
							format: 'binary'
						}
					}
				}
			},

			'400': {
				description: 'A client error',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/UserErrorResponse'
						},
						example: {
							success: false,
							message: 'URL is not valid. Please check your url and try again.'
						}
					}
				}
			},

			'500': {
				description: 'A server error',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/ServerErrorResponse'
						},
						example: {
							success: false,
							message: 'Internal server error.'
						}
					}
				}
			}
		}
	}
};
