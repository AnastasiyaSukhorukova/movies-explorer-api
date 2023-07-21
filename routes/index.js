const router = require('express').Router();
const { errors } = require('celebrate');
const {
  createUserJoi,
  signInJoi,
} = require('../middlewares/celebrate');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');

// получение мидлвары для проверки токена в запросе
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');

router.post('/signin', signInJoi, login);
router.post('/signup', createUserJoi, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

// router.use(auth);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth, (req, res, next) => next(new NotFoundError('Страница не найдена!')));

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(errors());

module.exports = router;
