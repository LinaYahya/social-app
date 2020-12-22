require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
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

// const app = require('./app');
const verifyUser = require('./controllers/middleWare/verifyUser');
const { getRoomChatMsgs, createMsg } = require('./database/queries/msgQueries');

const server = http.createServer(app);
const io = socketIo(server);

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(verifyUser)).on('connection', (socket) => {
  const { id: userID } = socket.request.user;

  socket.on('room', async (chatID) => {
    // 5fd37fe773265528ed10c914
    const data = await getRoomChatMsgs(chatID, 0);
    socket.join(chatID);
    socket.emit('room', data);
  });
  socket.on('msg', async ({ msg, roomID }) => {
    const data = await createMsg(msg, roomID, userID);
    socket.broadcast.to(roomID).emit('msg', data);
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

module.exports = { app, server };
