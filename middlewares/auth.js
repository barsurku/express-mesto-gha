require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/Unauthorized');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(UnauthorizedError)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  return next();
};
