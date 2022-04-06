import config from 'config';
import express from 'express';
import logger from 'utils/logger';
import connect from 'utils/connect';
import deserializeUser from 'middleware/deserializeUser';
import routes from './routes';

const port = config.get<number>('port');

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
	logger.info(`Server is running on port ${port}`);
	await connect();
	routes(app);
});
