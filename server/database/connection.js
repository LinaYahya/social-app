const mongoose = require('mongoose');
const { insertUsers, insertMsgs } = require('./fakeData');

const { MONGO_URI, DEV_DB_URL, NODE_ENV } = process.env;

let dbUrl;

switch (NODE_ENV) {
  case ('production'):
    dbUrl = MONGO_URI;
    break;
  case ('development'):
    dbUrl = DEV_DB_URL;
    break;
  default:
    throw new Error('No Database URL!!!');
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB connected'))
  .then(() => insertUsers())
  .then(() => insertMsgs())
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
