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
  // TODO this is incomplete
  cars[carIndex] = updatedCar;

  res.json({
    data: updatedCar,
  });
};

const updateOne = (_req, res) => {
  res.status(501).json({
    error: {
      message: "Not implemented",
    },
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
