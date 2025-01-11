const compression = require('compression');
const cors = require('cors');
const express = require('express');
const expressMongoSanitize = require('express-mongo-sanitize');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');
const path = require('path');

const index = require('./routes/index');
const ekadashRouter = require('./routes/ekadash');
const cityRouter = require('./routes/city');

const checkXApiKey = require('./middlewares/checkXApiKey');

const APP = express();
const isProd = process.env.ENVIRONMENT === 'prod';

// Используем прокси, и ему можно доверять
APP.enable('trust proxy');

// Шаблонизатор
// На случай отсутствия нормального клиента
APP.set('views', path.join(__dirname, 'views'));
APP.set('trust proxy', 1);

// APP.use(cors());
APP.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With, X-API-KEY',
    methods: 'GET,HEAD, POST, PATCH, DELETE, OPTIONS, PUT'
  })
);
APP.options('*', cors());
// или для каждого поинта отдельно
// app.options('/api/v1/some', cors());

// Путь до директории со статическими файлами
APP.use(express.static(path.join(__dirname, 'public')));

// Небольшая защита в виде добавления
// HTTP заголовков
APP.use(helmet());

// В режиме разработки добавляем логгер - в консоль , в режиме прод - в файл access.log
if (!isProd) APP.use(morgan('dev'));

// Установка лимита запросов на АПИ с одного IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: 'Too many requests from this IP, please try again later.'
});

APP.use(limiter);

// Лимит на чтение данных из тела запроса
APP.use(
  express.json({
    limit: '50mb',
    type: 'application/json'
  })
);

APP.use(express.urlencoded({ extended: true, limit: '50kb' }));

APP.use(expressMongoSanitize());

// APP.use(
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

APP.use(compression());

APP.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

APP.use('/', index);
// APP.use(checkXApiKey);
APP.use('/ekadash', ekadashRouter);
APP.use('/city', cityRouter);

module.exports = APP;
