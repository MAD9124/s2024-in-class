const cars = require("../models/cars");
const carService = require("../services/cars");

const create = (req, res, next) => {
  try {
    // getting the data from the request
    const newCar = carService.create(req.body);

    // send a response
    res.status(201).json({
      data: newCar,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = (_req, res, next) => {
  try {
    const cars = carService.getAll();
    res.json({
      data: cars,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = (req, res, next) => {
  try {
    // 1 get data from the request
    const { id } = req.params;

    const car = carService.getById(id);

    res.json({ data: car });
  } catch (err) {
    next(err);
  }
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

const uploadProfilePic = (req, res) => {
  res.json({
    data: {
      message: `Successfully upload image to "/public/uploads/${req.file.filename}`,
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
  uploadProfilePic,
};
