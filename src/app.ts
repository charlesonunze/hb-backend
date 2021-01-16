import express from 'express';
import { PORT } from './config';
import { logger } from './utils/main.logger';
import { loadRoutes } from './startup/routes';
import { loadMiddlewares } from './startup/middlewares';
import { NotFoundErrorHandler, ServerErrorHandler } from './utils/errorHandler';

const app = express();

// Load Middlewares
loadMiddlewares(app);
loadRoutes(app);

// Handle Errors
app.use(NotFoundErrorHandler);
app.use(ServerErrorHandler);

export default app.listen(PORT, (error: Error) => {
	if (error) throw new Error(error.message);
	logger.info(`Speak Lord! 👐, your server is listening on port: ${PORT}`);
});
