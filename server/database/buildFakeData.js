const mongoose = require('mongoose');
const connection = require('./connection');
const { insertUsers, insertMsgs, insertRoom } = require('./fakeData');

connection
  .then(() => insertUsers())
  .then(() => insertRoom())
  .then(() => insertMsgs())
  .then(() => {
    console.log('built successfully');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
    mongoose.disconnect();
  });
