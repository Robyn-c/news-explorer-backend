module.exports = (err, res, next) => {
  let { statusCode = 500, message } = err;
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'ID invalida';
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Ocurrió un error en el servidor' : message,
  });
  next();
};
