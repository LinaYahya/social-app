exports.notFoundErrorHandler = (req, res) => {
  res.status(404).send({ msg: 'page not found' });
};

// eslint-disable-next-line no-unused-vars
exports.serverErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);

  // boom error
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).send(payload);
};
