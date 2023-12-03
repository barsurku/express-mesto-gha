require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const NotFound = require('./utils/error/notFound');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validationCreateUser, validateLoginAuth } = require('./middlewares/validation');
const { error } = require('./middlewares/error');

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

app.post('/signin', validateLoginAuth, login);
app.post('/signup', validationCreateUser, createUser);
app.use(auth);
app.use(errors());
app.use(error);

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use('*', (req, res) => {
  res.status(NotFound).send({
    message: 'Страница не найдена',
  });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
