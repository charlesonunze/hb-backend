import { Router } from 'express';
import ThumbnailController from '../controllers/thumbnail.controller';
import protectRoute from '../middlewares/auth';
import catchAsyncErrors from '../middlewares/catch-async-errors';

const router = Router();
const thumbnailController = new ThumbnailController();

router.post(
	'/thumbnail/create',
	protectRoute,
	catchAsyncErrors(thumbnailController.create)
);

export { router as thumbnailRoutes };
