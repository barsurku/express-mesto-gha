require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { errorServer } = require('./middlewares/error');
const router = require('./routes/index');

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;

app.use(router);
app.use(errors());
app.use(errorServer);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT);
