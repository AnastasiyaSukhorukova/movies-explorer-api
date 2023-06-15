require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const errorsMiddleware = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

app.use(express.json());
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {});

app.use('/', require('./routes/index'));

app.use(errorsMiddleware);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
