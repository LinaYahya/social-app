const mongoose = require('mongoose');
const connection = require('./connection');
const { insertUsers, insertMsgs } = require('./fakeData');

connection
  .then(() => insertUsers())
  .then(() => insertMsgs())
  .then(() => {
    console.log('built successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });
