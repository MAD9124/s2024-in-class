require('dotenv/config');

const express = require('express');
const debug = require('debug')('car:app');

require('./utils/db');
const sanitizeBody = require('./middlewares/sanitizeBody');
const carsRouter = require('./routers/cars');
const { errorHandler } = require('./utils/errors');

const app = express();

// middleware
app.use(express.json());
app.use(sanitizeBody);

app.get('/', (_req, res) => {
  res.send('Server running 🚀🚀🚀');
});

app.use('/api/cars', carsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  debug(`App running on port ${PORT}`);
});
