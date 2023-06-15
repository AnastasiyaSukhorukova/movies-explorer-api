const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const getUserId = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден.'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => {
          const noPasswordUser = user.toObject({ useProjection: true });
          return res.status(201).send(noPasswordUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
          }
          if (err.code === 11000) {
            return next(new ConflictError('Пользователь с указанным e-mail уже зарегистрирован.'));
          }
          return next(err);
        });
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(201).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Пользователь не найден.'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля.'));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getUserId,
  updateUser,
};
