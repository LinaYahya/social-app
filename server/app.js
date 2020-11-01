require('dotenv').config();

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');

const router = require('./router');
const dbConnection = require('./database/connection');

const app = express();

app.disabled('x-powered-by');
app.set('PORT', process.env.PORT || 5000);

const middleWares = [
  compression(),
  express.urlencoded({ extended: false }),
  express.json(),
];

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(middleWares);

app.use('/api/v1/', router);

dbConnection
  .on('open', () => console.log('opened'))
  .on('error', () => console.log('error happened'));

app.use((req, res) => {
  res.status(404).send({ msg: 'page not found' });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
