module.exports.errorServer = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode)
    .send({
      message:
      statusCode === 500
        ? 'Ошибка загрузки сервера'
        : message,
    });
  return next();
};
