import express from 'express';
import * as Sentry from '@sentry/node';

import { PORT } from './config';
import { logger } from './utils/main.logger';
import { loadRoutes } from './startup/routes';
import { loadMiddlewares } from './startup/middlewares';
import { NotFoundErrorHandler, ServerErrorHandler } from './utils/errorHandler';

const app = express();

Sentry.init({
	dsn:
		'https://62dc4a4b5e674d119cc3590f49d95398@o361828.ingest.sentry.io/5596078'
});

// Load Middlewares
app.use(Sentry.Handlers.requestHandler());
loadMiddlewares(app);
loadRoutes(app);

// Handle Errors
app.use(Sentry.Handlers.errorHandler());
app.use(NotFoundErrorHandler);
app.use(ServerErrorHandler);

export default app.listen(PORT, (error: Error) => {
	if (error) throw new Error(error.message);
	logger.info(`Speak Lord! 👐, your server is listening on port: ${PORT}`);
});
