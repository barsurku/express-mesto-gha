const cardsRouter = require('express').Router();
const {
  createCard, getCards, likeCard, dislikeCard, deleteCard,
} = require('../controllers/cards');
const { validationCreateCard, validationGetCardById } = require('../middlewares/validation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validationCreateCard, createCard);
cardsRouter.put('/cards/:cardId/likes', validationGetCardById, likeCard);
cardsRouter.delete('/cards/:cardId/likes', validationGetCardById, dislikeCard);
cardsRouter.delete('/cards/:cardId', validationGetCardById, deleteCard);

module.exports = cardsRouter;
