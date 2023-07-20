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
        return next(new BadRequestError('Пользователь не найден.'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 16)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => {
          const noPasswordUser = user.toObject({ useProjection: true });
          return res.status(201).send(noPasswordUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return next(new NotFoundError('Переданы некорректные данные при создании пользователя.'));
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
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new NotFoundError('Передан неверный идентификатор пользователя'));
      }

      return next(err);
    });
};

module.exports = {
  createUser,
  getUserId,
  updateUser,
};
