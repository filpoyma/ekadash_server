const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const isProd = process.env.ENVIRONMENT === 'prod';

const PORT = 3000;

// if (!isProduction) mongoose.set('debug', true); // Логгер Mongoose

const server = async () => {
  console.log('Connecting to DB...');
  try {
    if (isProd)
      await mongoose.connect(process.env.DB_CLOUD_URL, {
        serverSelectionTimeoutMS: 15000
      });
    else
      await mongoose.connect(process.env.DB_LOCAL_URL);
    console.log('DB connected to ', isProd ? 'Prod DB' : 'Local DB');

    app.listen(PORT, () => {
      console.log(`App running on port http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('Connection Error', e);
  }
};

server();
