'use strict';

require('dotenv/config');
const express = require('express');
const morgan = require('morgan');

require('./utils/db');
require('./utils/passport');
const courseRouter = require('./routers/course');
const roundRouter = require('./routers/round');
const { errorHandler } = require('./utils/errors');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/courses', courseRouter);
app.use('/api/rounds', roundRouter);

app.get('/', (_req, res) => {
  res.send('Server running ⛳️⛳️⛳️');
});

app.get('*', (_req, res) => {
  res.status(404).json({
    error: {
      message: '404 | Not found',
    },
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
