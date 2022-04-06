import { Express, Request, Response } from 'express';
import { createUserSchema } from 'schema/user.schema';
import { createSessionSchema } from 'schema/session.schema';
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	updateProductSchema
} from 'schema/product.schema';
import { createUserHandler } from 'controllers/user.controller';
import {
	createUserSessionHandler,
	deleteSessionHandler,
	getUserSessionsHandler
} from 'controllers/session.controller';
import {
	createProductHandler,
	deleteProductHandler,
	getProductHandler,
	updateProductHandler
} from 'controllers/product.controller';
import requireUser from 'middleware/requireUser';
import validateResource from 'middleware/validateResource';

function routes(app: Express) {
	app.get('/heathcheck', (req: Request, res: Response) => res.sendStatus(200));

	app.post('/api/users', validateResource(createUserSchema), createUserHandler);

	app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

	app.get('/api/sessions', requireUser, getUserSessionsHandler);

	app.delete('/api/sessions', requireUser, deleteSessionHandler);

	app.post(
		'/api/products',
		[requireUser, validateResource(createProductSchema)],
		createProductHandler
	);

	app.put(
		'/api/products/:productId',
		[requireUser, validateResource(updateProductSchema)],
		updateProductHandler
	);

	app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler);

	app.delete(
		'/api/products/:productId',
		[requireUser, validateResource(deleteProductSchema)],
		deleteProductHandler
	);
}

export default routes;
