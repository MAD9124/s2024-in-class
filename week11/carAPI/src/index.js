require('dotenv/config');

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const sanitizeMongo = require('express-mongo-sanitize');

require('./utils/db');
const sanitizeBody = require('./middlewares/sanitizeBody');
const carsRouter = require('./routers/cars');
const { errorHandler } = require('./utils/errors');
const logger = require('./utils/logger');

const app = express();

// middleware
app.use(cors('*'));
app.use(express.json());

app.use(sanitizeMongo());
app.use(sanitizeBody);

app.use(
  morgan('tiny', {
    stream: { write: (message) => logger.info(message) },
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(helmet());
}

app.get('/', (_req, res) => {
  res.send('Server running 🚀🚀🚀');
});

app.use('/api/cars', carsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}`);
});
