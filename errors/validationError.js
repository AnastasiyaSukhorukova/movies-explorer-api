const BadRequestError = require('./badRequestError');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BadRequestError;
  }
}

module.exports = new ValidationError('Ошибка валидации. Преданы некорректные данные!');
