export const components = {
	schemas: {
		SuccessResponse: {
			properties: {
				success: {
					type: 'boolean',
					example: true
				},
				message: {
					type: 'string',
					example: 'Login successful.'
				},
				data: {
					type: 'object',
					properties: {
						token: {
							type: 'string',
							example:
								'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjIiLCJwYXNzd29yZCI6IjIiLCJpYXQiOjE2MTA4NDA5MTMsImV4cCI6MTYxMDg1MTcxM30.RUPYSxUL1dl4Fdmrb9yymPjyJ4cC3ZDAh2r1jAUz5hc'
						}
					}
				}
			}
		},
		UserErrorResponse: {
			properties: {
				success: {
					type: 'boolean',
					example: false
				},
				message: {
					type: 'string',
					example: 'Something bad happened.'
				}
			}
		},
		ServerErrorResponse: {
			properties: {
				success: {
					type: 'boolean',
					example: false
				},
				message: {
					type: 'string',
					example: 'Internal server error.'
				}
			}
		}
	}
};
