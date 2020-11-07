const jwt = require('jsonwebtoken');

exports.sign = (payload) => new Promise((resolve, reject) => {
  jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
    if (err) reject(err);
    else resolve(token);
  });
});
