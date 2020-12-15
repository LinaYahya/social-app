const http = require('http');
const socketIo = require('socket.io');

const app = require('./app');
const verifyUser = require('./controllers/middleWare/verifyUser');

const server = http.createServer(app);
const io = socketIo(server);

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(verifyUser)).on('connection', (socket) => {
  socket.on('data', (msg) => {
    console.log('hi from server', msg);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = server;
