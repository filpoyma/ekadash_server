import compression from 'compression';
import cors from 'cors';
import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import routes from './routes/index.js';
import logger from './utils/logger.js';
import config from './config/config.js';

const app = express();
const isProd = process.env.NODE_ENV === 'production';
const __dirname = import.meta.dirname;

// Используем прокси, и ему можно доверять
app.enable('trust proxy');

app.set('trust proxy', 1);

// app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With, X-API-KEY',
    methods: 'GET,HEAD, POST, PATCH, DELETE, OPTIONS, PUT'
  })
);
app.options('*', cors());
// или для каждого поинта отдельно
// app.options('/api/v1/some', cors());

// Путь до директории со статическими файлами
app.use(express.static(path.join(__dirname, 'public')));

// Небольшая защита в виде добавления
// HTTP заголовков
app.use(helmet());

// В режиме разработки добавляем логгер - в консоль , в режиме прод - в файл access.log
if (!isProd) app.use(morgan('dev'));

// Установка лимита запросов на АПИ с одного IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: 'Too many requests from this IP, please try again later.'
});

app.use(limiter);

// Лимит на чтение данных из тела запроса
app.use(
  express.json({
    limit: '50mb',
    type: 'application/json'
  })
);

app.use(express.urlencoded({ extended: true, limit: '50kb' }));

app.use(expressMongoSanitize());

// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );

app.use(compression());

app.use((req, res, next) => {
  if(config.isDev) logger.info(`${req.method}, ${req.originalUrl}`);
  next();
});

// Mount API routes
app.use('/ekadash_api/v1', routes);

export default app;
