const userRouter = require('express').Router();

const {
  getUserId,
  updateUser,
} = require('../controllers/users');

const { updateUserJoi } = require('../middlewares/celebrate');

userRouter.get('/me', getUserId); // возвращает информацию о пользователе (email и имя)
userRouter.patch('/me', updateUserJoi, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = userRouter;
