const router = require('express').Router();
const {
  getUsers, getUserByID, getUser, updateUser, updateAvatar,
} = require('../controllers/users');
const { validationUpdateUser, validationUpdateAvatar, validationGetUserById } = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/me', getUser);
router.get('/users/:id', validationGetUserById, getUserByID);
router.patch('/users/me', validationUpdateUser, updateUser);
router.patch('/users/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
