const User = require('../models/user');
const ERROR_CODE = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_CODE.internalServerError).send({
      message: 'Ошибка загрузки сервера',
    }));
};

module.exports.getUserByID = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(ERROR_CODE.notFound).send({
          message: 'Пользователь с таким ID не найден',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
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

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(ERROR_CODE.notFound).send({
          message: 'Пользователь с таким ID не найден',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(ERROR_CODE.notFound).send({
          message: 'Пользователь с таким ID не найден',
        });
        return;
      }
      res.status(ERROR_CODE.internalServerError).send({
        message: 'Ошибка загрузки сервера',
      });
    });
};
