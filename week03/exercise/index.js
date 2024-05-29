const express = require("express");

const cars = require("./cars");

const app = express();

// middleware
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running 🚀🚀🚀");
});

// C - Create
app.post("/api/cars/", (req, res) => {
  const newCar = {
    ...req.body,
    // not 100% unique
    // close enough for testing
    id: Date.now(),
  };
  // add to the cars array
  cars.push(newCar);

  // send a response
  res.status(201).json({
    data: newCar,
  });
}); // create a new car

// R - Read all
app.get("/api/cars/", (_req, res) => {
  res.json({
    data: cars,
  });
}); // return a collection of cars

// R - Read one
app.get("/api/cars/:id", (req, res) => {
  const { id } = req.params;

  const car = cars.find((car) => car.id === Number(id));
  if (!car) {
    res.status(404).json({
      error: {
        message: `Car with id ${id} not found`,
      },
    });
    return;
  }

  res.json({ data: car });
}); // return the car matching the id value

// U - Update (replace)
app.put("/api/cars/:id", (req, res) => {
  const id = Number(req.params.id);

  const carIndex = cars.findIndex((car) => car.id == id);
  if (carIndex === -1) {
    // car not found
    res.status(404).json({
      error: {
        message: `Car with id ${id} not found`,
      },
    });
    return;
  }

  const updatedCar = {
    ...req.body,
    id,
  };

  cars[carIndex] = updatedCar;

  res.json({
    data: updatedCar,
  });
}); // replace all properties of a car

// U - Update (partial)
app.patch("/api/cars/:id", (req, res) => {}); // update some properties of a car

// D - Delete
app.delete("/api/cars/:id", (req, res) => {}); // destroy the record for a car

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
