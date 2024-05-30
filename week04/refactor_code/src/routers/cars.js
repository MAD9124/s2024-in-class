const { Router } = require("express");

const cars = require("../models/cars");

const carsRouter = Router();

// C - Create
carsRouter.post("/", (req, res) => {
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
carsRouter.get("/", (_req, res) => {
  res.json({
    data: cars,
  });
}); // return a collection of cars

// R - Read one
carsRouter.get("/:id", (req, res) => {
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
carsRouter.put("/:id", (req, res) => {
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
carsRouter.patch("/:id", (req, res) => {
  res.status(501).json({
    error: {
      message: "Not implemented",
    },
  });
}); // update some properties of a car

// D - Delete
carsRouter.delete("/:id", (req, res) => {
  res.status(501).json({
    error: {
      message: "Not implemented",
    },
  });
}); // destroy the record for a car

module.exports = carsRouter;
