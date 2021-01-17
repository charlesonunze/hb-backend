import { Router } from 'express';
import JsonPatchController from '../controllers/jsonPatch.controller';
import protectRoute from '../middlewares/auth';
import catchAsyncErrors from '../middlewares/catch-async-errors';

const router = Router();
const jsonController = new JsonPatchController();

router.patch(
	'/patch-json',
	protectRoute,
	catchAsyncErrors(jsonController.patchJSON)
);

export { router as jsonPatchRoutes };
