const express = require("express");

const movieRouter = require("./routers/movies");
const { errorHandler } = require("./utils/errors");

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Server running, go to `/api/movies?keyword=[keyword]&sort=[sort]` to see the movies');
})
app.use("/api/movies", movieRouter);

app.use("*", (_req, res) => {
  res.status(404).send("404 | Not found");
});

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
