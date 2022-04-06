import config from 'config';
import mongoose from 'mongoose';
import logger from 'utils/logger';

async function connect() {
	const databaseURI = config.get<string>('databaseURI');
	try {
		await mongoose.connect(databaseURI);
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error('Could not connect to MongoDB.');
		process.exit(1);
	}
}

export default connect;
