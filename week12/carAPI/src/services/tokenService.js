const jwt = require('jsonwebtoken');

const generateToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });

module.exports = {
  generateToken,
};
