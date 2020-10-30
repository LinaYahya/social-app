const express = require('express');
const compression = require('compression');
const morgan = require('morgan');

const router = require('./router');

const app = express();

app.disabled('x-powered-by');
app.set('PORT', process.env.PORT || 5000);

const middleWares = [compression(), express.urlencoded({ extended: false }), express.json()];

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(middleWares);

app.use('/api/v1/', router);

module.exports = app;
