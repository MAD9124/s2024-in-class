const express = require("express");

const cars = [
  { id: 1, make: "Tesla", model: "S", colour: "Black" },
  { id: 2, make: "Tesla", model: "3", colour: "Red" },
  { id: 3, make: "Tesla", model: "X", colour: "Silver" },
  { id: 4, make: "Tesla", model: "Y", colour: "Chestnut Brown" },
];

const app = express();

app.get("/api", (req, res) => {
  const data = {
    message: "Hello from express!",
  };
  res.json({ data });
});

app.get("*", (req, res) => {
  res.status(404).send("404 | Page not found");
});

app.listen(4000, (err) => {
  if (err) {
    return console.log("something went wrong", err);
  }
  console.log("Server running on port 4000...");
});
