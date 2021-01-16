export const loginDocs = {
	post: {
		tags: ['AUTHENTICATION'],
		summary: 'Login a user.',

		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							username: {
								type: 'string',
								example: 'charles'
							},
							password: {
								type: 'string',
								example: '1234'
							}
						},
						required: ['username', 'password']
					}
				}
			}
		},

		responses: {
			'200': {
				description: 'Success response',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/SuccessResponse'
						},
						example: {
							success: true,
							message: 'Login successful.',
							data: {
								token:
									'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIiLCJwYXNzd29yZCI6IjIiLCJpYXQiOjE2MTA3NTc3MjcsImV4cCI6MTYxMDc2MTMyN30.xZsMsFi1jmcr0afMJxJr3M_p_l5i-G-rs-bF8yxDMSY'
							}
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
							message: '"password" is required'
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
