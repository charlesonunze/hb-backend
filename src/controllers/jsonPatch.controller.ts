import jsonpatch from 'jsonpatch';
import { RequestHandler } from 'express';

import { sendResponse } from '../utils/response';
import { UserError } from '../utils/errorHandler';
import { validateJsonInput, handleValidationError } from '../validators';

class JsonPatchController {
	patchJSON: RequestHandler = async (req, res) => {
		const { error, value: JsonObjects } = validateJsonInput(req.body);

		if (error) return handleValidationError(error);

		const { originalDocument, patchDocument } = JsonObjects;

		try {
			const patchedDocument = jsonpatch.apply_patch(
				originalDocument,
				patchDocument
			);

			return sendResponse({
				res,
				data: { patchedDocument },
				message: 'Patched document.'
			});
		} catch (error) {
			throw new UserError(error.message);
		}
	};
}

export default JsonPatchController;
