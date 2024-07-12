"use strict";

const express = require("express");
const roundRouter = require("./routers/router");

const app = express();
app.use(express.json());

app.use("/api/rounds", roundRouter);

app.get("/", (_req, res) => {
  res.send("Server running ⛳️⛳️⛳️");
});

app.use("*", (_req, res) => {
  res.status(404).json({
    error: {
      message: "404 | Not found",
    },
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
