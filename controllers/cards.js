const Card = require('../models/card');
const ForbiddenError = require('../utils/error/Forbidden');
const NotFound = require('../utils/error/notFound');
const BadRequest = require('../utils/error/badRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send({ cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с данным ID не найдена');
      }
      return res.status().send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с данным ID не найдена');
      }
      return res.status().send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (card.owner._id.toString() !== req.user._id) {
        Card.deleteOne(card)
          .then(() => {
            res.send(card);
          })
          .catch(next);
      } else {
        throw new ForbiddenError('Невозможно удалить');
      }
    })
    .then((user) => {
      if (!user) {
        throw new NotFound('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Введены некорректные данные'));
      }
      return next(err);
    });
};
