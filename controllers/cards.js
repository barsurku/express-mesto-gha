const Card = require('../models/card');
const ERROR_CODE = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE.internalServerError).send({
      message: 'Ошибка загрузки сервера',
    }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE.badRequest).send({
          message: 'Введены некорректные данные',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};

module.exports.likeCard = (req, res) => {
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
        res.status(ERROR_CODE.notFound).send({ message: 'Карточка с данным ID не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.badRequest).send({
          message: 'Введены некорректные данные',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};

module.exports.dislikeCard = (req, res) => {
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
        res.status(ERROR_CODE.notFound).send({ message: 'Карточка с данным ID не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.badRequest).send({
          message: 'Введены некорректные данные',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_CODE.notFound).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE.badRequest).send({
          message: 'Введены некорректные данные',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};
