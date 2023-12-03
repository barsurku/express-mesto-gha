const router = require('express').Router();
const {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { validationCreateCard, validationGetCardById } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', validationCreateCard, createCard);
router.put('/cards/:cardId/likes', validationGetCardById, likeCard);
router.delete('/cards/:cardId/likes', validationGetCardById, dislikeCard);
router.delete('/cards/:cardId', validationGetCardById, deleteCard);

module.exports = router;
