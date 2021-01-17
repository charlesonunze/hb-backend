import { Application } from 'express';
import { authRoutes } from '../routes/auth.route';
import { swaggerRoute } from '../routes/docs.route';
import { jsonPatchRoutes } from '../routes/jsonPatch.route';
import { thumbnailRoutes } from '../routes/thumbnail.route';

export const loadRoutes = (app: Application) => {
	// Root Route
	app.get('/', (req, res) => {
		res.send('Hi there!');
	});

	// API Routes
	app.use('/api/v1', authRoutes);
	app.use('/api/v1', jsonPatchRoutes);
	app.use('/api/v1', thumbnailRoutes);

	// Swagger Docs
	app.use('/api/docs', swaggerRoute);
};
