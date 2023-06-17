const router = require('express').Router();
const { errors } = require('celebrate');
const {
  signUpJoi,
  signInJoi,
} = require('../middlewares/celebrate');
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');

// получение мидлвары для проверки токена в запросе
const { auth } = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const BadRequestError = require('../errors/badRequestError');

router.post('/signin', signUpJoi, login);
router.post('/signup', signInJoi, createUser);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('/*', auth, (req, res, next) => next(new BadRequestError('This page not found')));

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use(errors());

module.exports = router;
