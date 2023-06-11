const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {});

// подключаем мидлвары, роуты и всё остальное...

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});