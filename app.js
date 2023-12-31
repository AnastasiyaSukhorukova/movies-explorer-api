require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { corsOptions } = require('./constants/constants');

const errorsMiddleware = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiterSetting } = require('./constants/constants');

const { PORT, DB_ADDRESS } = require('./constants/config');

mongoose.connect(DB_ADDRESS, {});

const app = express();

const limiter = rateLimit(limiterSetting);
app.use(limiter);

app.use(cors(corsOptions));

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
