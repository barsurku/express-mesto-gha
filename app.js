const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { notFound } = require('./utils/errors');

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;
app.listen(PORT);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(notFound).send({
    message: 'Страница не найдена',
  });
});

app.use((req, res, next) => {
  req.user = {
    _id: '656780970c043c2813f87327',
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');