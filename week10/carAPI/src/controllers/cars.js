const carService = require('../services/cars');

const create = async (req, res, next) => {
  try {
    // getting the data from the request
    const newCar = await carService.create(req.body);

    // send a response
    res.status(201).json({
      data: newCar,
    });
  } catch (err) {
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { make } = req.query;

    const cars = await carService.getAll(make);

    res.json({
      data: cars,
    });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await carService.getById(id);

    res.json({ data: car });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedCar = await carService.updateOne(id, req.body);

    res.json({
      data: updatedCar,
    });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCar = await carService.deleteOne(id);
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
  updateOne,
  deleteOne,
  uploadProfilePic,
};
