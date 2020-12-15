require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const connection = require('./database/connection');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');
app.set('PORT', process.env.PORT || 5000);

const middleWares = [
  compression(),
  express.urlencoded({ extended: false }),
  express.json(),
  cookieParser(),
];

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(middleWares);

app.use('/api/v1/', router);

connection
  .on('open', () => console.log('mongo database is connected'))
  .on('error', () => process.exit(1));

app.use((req, res) => {
  res.status(404).send({ msg: 'page not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);

  // boom error
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).send(payload);
});

module.exports = app;
