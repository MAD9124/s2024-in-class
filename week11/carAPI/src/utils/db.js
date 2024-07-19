const mongoose = require('mongoose');
const debug = require('debug')('car:db');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    debug('Connected to mongoose');
  })
  .catch((err) => {
    debug('Error connecting to mongoose', err);
  });
