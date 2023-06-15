const NotFoundError = require('../errors/notFoundError');

module.exports = () => {
  throw new NotFoundError('Указанного пути не существует');
};
