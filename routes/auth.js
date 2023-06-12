const authRouter = require('express').Router();
const { createUser } = require('../controllers/users');
const { login } = require('../controllers/login');
const {
  signUpJoi,
  signInJoi,
} = require('../middlewares/celebrate');

authRouter.post('/signup', signUpJoi, createUser);
authRouter.post('/signin', signInJoi, login);

module.exports = authRouter;