const router = require('express').Router();
const { errors } = require('celebrate');

const { loginJoi, createUserJoi } = require('../middlewares/celebrate');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const auth = require('../middlewares/auth');

const login = require('../controllers/login');
const createUser = require('../controllers/users');

const NotFoundError = require('../errors/notFoundError');

router.use(requestLogger); // подключаем логгер запросов

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginJoi, login);
router.post('/signup', createUserJoi, createUser);

router.use(auth);
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('/*', (req, res, next) => next(new NotFoundError('404: Not Found.')));
router.use(errorLogger); // подключаем логгер ошибок

router.use(errors({ message: 'Ошибка валидации данных!' }));

module.exports = router;
