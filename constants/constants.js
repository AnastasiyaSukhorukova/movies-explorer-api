const CODE_OK = 200;
const CODE_CREATED = 201;
const defaultErrorMessage = 'Произошла ошибка.';
const urlPattern = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const limiterSetting = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
};

const allowedCors = [
  'https://anastasiya.movies.nomoredomains.rocks',
  'http://anastasiya.movies.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = {
  CODE_OK,
  CODE_CREATED,
  defaultErrorMessage,
  urlPattern,
  limiterSetting,
  corsOptions,
};
