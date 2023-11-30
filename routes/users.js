const router = require('express').Router();
const {
  createUser, getUserByID, updateUser, getUsers, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserByID);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
