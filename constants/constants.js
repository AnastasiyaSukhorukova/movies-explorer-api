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

module.exports = {
  CODE_OK,
  CODE_CREATED,
  defaultErrorMessage,
  urlPattern,
  limiterSetting,
};
