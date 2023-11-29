const router = require('express').Router();
const {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
router.delete('/cards/:cardId/likes', deleteCard);

module.exports = router;
