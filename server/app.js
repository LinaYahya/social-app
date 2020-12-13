require('dotenv').config();
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const router = require('./router');
const verifyUser = require('./controllers/middleWare/verifyUser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(verifyUser)).on('connection', (socket) => {
  socket.on('data', (msg) => {
    console.log('hi from server', msg);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

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

module.exports = { server, app };
