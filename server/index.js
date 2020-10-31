const app = require('./app');

app.listen(app.get('PORT'), () => {
  console.log('http://localhost:5000');
});
