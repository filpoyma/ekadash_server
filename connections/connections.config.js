import mongoose from 'mongoose';
import config from '../config/config.js';
import logger from '../utils/logger.js';

const dbUrl = config.mongoUrl;
const PORT = config.port;

const dbConnect = () => {
  logger.info('Connecting to DB...');
  if (!dbUrl) {
    logger.err('MONGO_URI is required.');
    process.exit(1);
  }
  mongoose
    .connect(dbUrl, {
      serverSelectionTimeoutMS: 15000
    })
    .then((conn) => {
      logger.info(`MongoDB Connected: ${conn.connection?.host}`);
    })
    .catch(logger.err);
};

const serverListen = (app) => {
  if (!PORT) {
    logger.err('PORT is required.');
    process.exit(1);
  }
  app.listen(PORT, () => {
    logger.info(`App running on port http://localhost:${PORT}`);
  });
};

export { dbConnect, serverListen };
