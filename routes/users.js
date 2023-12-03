const usersRouter = require('express').Router();
const {
  getUsers, getUserByID, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { validationGetUserById, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUser);
usersRouter.get('/users/:id', validationGetUserById, getUserByID);
usersRouter.patch('/users/me', validationUpdateUser, updateUser);
usersRouter.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = usersRouter;
