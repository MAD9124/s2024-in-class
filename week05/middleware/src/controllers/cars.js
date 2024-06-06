const cars = require("../models/cars");

const create = (req, res) => {
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
};

const getAll = (_req, res) => {
  res.json({
    data: cars,
  });
};

const getOne = (req, res) => {
  // 1 get data from the request
  const { id } = req.params;

  // 2 perform the logic
  // const car = carsService.getOne(id);

  // 3 respond
  // res.json({ data: car })

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
};

const replaceOne = (req, res) => {
  const carId = Number(req.params.id);
  const carIndex = cars.findIndex(({ id }) => id === carId);
  if (carIndex === -1) {
    res.status(404).json({
      error: {
        message: `Car with id ${carId} not found`,
      },
    });
    return;
  }
  const updatedCar = {
    ...req.body,
    id: carId,
  };
  cars[carIndex] = updatedCar;

  res.json({
    data: updatedCar,
  });
};

const updateOne = (req, res) => {
  const carId = Number(req.params.id);
  const carIndex = cars.findIndex(({ id }) => id === carId);
  if (carIndex === -1) {
    res.status(404).json({
      error: {
        message: `Car with id ${carId} not found`,
      },
    });
    return;
  }

  const { make, model, colour } = req.body;
  const updatedCar = {
    ...cars[carIndex],
    // spread undefined (nothing) if undefined
    // add make to the object if defined
    ...(make && { make }),
    ...(model && { model }),
    ...(colour && { colour }),
  };

  // if (make) updatedCar.make = make;
  // if (model) updatedCar.model = model;
  // if (colour) updatedCar.colour = colour;

  cars[carIndex] = updatedCar;

  res.json({
    data: updatedCar,
  });
};

const deleteOne = (_req, res) => {
  res.status(501).json({
    error: {
      message: "Not implemented",
    },
  });
};

module.exports = {
  create,
  getAll,
  getOne,
  replaceOne,
  updateOne,
  deleteOne,
};
