import mongoose from 'mongoose';
import dotEnv from 'dotenv';
dotEnv.config();

const isProd = process.env.ENVIRONMENT === 'prod';
const dbUrl = isProd ? process.env.DB_CLOUD_URL : process.env.DB_LOCAL_URL;
const PORT = process.env.PORT || 3000;

// if (!isProduction) mongoose.set('debug', true); // Логгер Mongoose
const dbConnect = () => {
  console.log('Connecting to DB...');
  mongoose
    .connect(dbUrl, {
      serverSelectionTimeoutMS: 15000
    })
    .then((conn) => {
      console.log(`MongoDB Connected: ${conn.connection?.host}`);
    })
    .catch(console.error);
};

const serverListen = (app) => {
  app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
  });
};

export { dbConnect, serverListen };
