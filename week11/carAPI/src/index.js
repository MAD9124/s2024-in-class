require('dotenv/config');

const express = require('express');
const debug = require('debug')('car:app');
const sanitizeMongo = require('express-mongo-sanitize');

require('./utils/db');
const sanitizeBody = require('./middlewares/sanitizeBody');
const carsRouter = require('./routers/cars');
const { errorHandler } = require('./utils/errors');
const logger = require('./utils/logger');

const app = express();

// middleware
app.use(express.json());
app.use(sanitizeBody);

app.use(sanitizeMongo());

app.get('/', (_req, res) => {
  res.send('Server running 🚀🚀🚀');
});

app.use('/api/cars', carsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
