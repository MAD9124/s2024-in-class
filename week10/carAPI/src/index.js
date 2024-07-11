const express = require('express');

require('dotenv/config');
require('./utils/db');
const carsRouter = require('./routers/cars');
const { errorHandler } = require('./utils/errors');

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url} - ${new Date()}`);
  next();
});
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server running 🚀🚀🚀');
});

app.use('/api/cars', carsRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
