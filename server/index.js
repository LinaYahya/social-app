const { server, app } = require('./app');

server.listen(app.get('PORT'), () => {
  console.log('http://localhost:5000');
});
