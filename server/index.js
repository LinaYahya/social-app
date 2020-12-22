const { app, server } = require('./app');
// const server = require('./socket');

server.listen(app.get('PORT'), () => {
  console.log('http://localhost:5000');
});
