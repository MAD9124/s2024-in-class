const express = require("express");

const carsRouter = require("./routers/cars");

const app = express();

// middleware
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});

app.use("/api/cars", carsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
