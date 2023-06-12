const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const AuthError = require('../errors/authError');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new AuthError('Неправильные почта или пароль.'));
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
      // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
          // хеши не совпали — отклоняем промис
            return next(new AuthError('Неправильные почта или пароль.'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch(next);
};