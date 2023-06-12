// схема карточки
const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https'] }),
      message: 'Некорректная ссылка на постер к фильму',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https'] }),
      message: 'Некорректная ссылка на постер к фильму',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { require_protocol: true, require_valid_protocol: true, protocols: ['http', 'https'] }),
      message: 'Некорректная ссылка на постер к фильму',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// создание моделей
module.exports = mongoose.model('movies', movieSchema);