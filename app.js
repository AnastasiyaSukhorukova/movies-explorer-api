require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const errorsMiddleware = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiterSetting } = require('./constants/constants');

const { PORT, DB_ADDRESS } = require('./constants/config');

const router = require('./routes');

const app = express();

const limiter = rateLimit(limiterSetting);
app.use(limiter);

app.use(cors());

app.use(express.json());
mongoose.connect(DB_ADDRESS, {});

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
