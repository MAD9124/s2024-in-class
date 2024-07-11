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

const getAll = (req, res, next) => {
  try {
    const { make } = req.query;

    const cars = carService.getAll(make);
    
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

const replaceOne = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updatedCar = carService.replaceOne(id, req.body);

    res.json({
      data: updatedCar,
    });
  } catch (err) {
    next(err);
  }
};

const updateOne = (req, res, next) => {
  try {
    const id = Number(req.params.id);

    const updatedCar = carService.updateOne(id, req.body);

    res.json({
      data: updatedCar,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const deletedCar = carService.deleteOne(id);
    res.json({
      data: deletedCar,
    });
  } catch (err) {
    next(err);
  }
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
