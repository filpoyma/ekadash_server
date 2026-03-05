import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";

const config = {
  env,
  port: process.env.PORT,
  isDev: env === "development",
  isProd: env === "production",
  isTest: env === "test",

  mongoUrl: env === 'production' ? process.env.MONGODB_PROD_URI : process.env.MONGODB_DEV_URI,
  mongoCloudUri: process.env.MONGODB_CLOUD_URI,

  serverKey: process.env.SERVER_KEY,
  oneSignalAppId: process.env.ONESIGNAL_APP_ID,
  oneSignalRestApiKey: process.env.ONESIGNAL_REST_API_KEY,

  logLevel: process.env.LOG_LEVEL || "info",
};

export default config;
