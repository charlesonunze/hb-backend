export const jsonPatchDocs = {
	patch: {
		tags: ['JSON PATCHING'],
		summary: 'Patch a JSON object.',

		parameters: [
			{
				in: 'header',
				name: 'x-auth-token',
				schema: {
					type: 'string'
				},
				required: true
			}
		],

		requestBody: {
			content: {
				'application/json': {
					schema: {
						type: 'object',
						properties: {
							originalDocument: {
								type: 'object',
								example: {
									name: 'charles'
								}
							},
							patchDocument: {
								type: 'string',
								example: [
									{
										op: 'replace',
										path: '/name',
										value: 'daniel'
									}
								]
							}
						},
						required: ['originalDocument', 'patchDocument']
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
							message: 'Patched document.',
							data: {
								patchedDocument: {
									name: 'daniel'
								}
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
							message: 'Replace operation must point to an existing value!'
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
