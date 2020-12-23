require('dotenv').config();

const http = require('http');
const { join } = require('path');
const express = require('express');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const compression = require('compression');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');

const router = require('./router');
const connection = require('./database/connection');
const verifyUser = require('./controllers/middleWare/verifyUser');
const { getRoomChatMsgs, createMsg } = require('./database/queries/msgQueries');

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

app.use(middleWares);

app.use('/api/v1/', router);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

connection
  .on('open', () => console.log('mongo database is connected'))
  .on('error', () => process.exit(1));

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

module.exports = { app, server };
