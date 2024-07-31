const { ObjectId } = require('mongodb');

const Car = require('../models/cars');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

const create = async (owner, input) => {
  const newCar = new Car({ ...input, owner });
  await newCar.save();

  return newCar;
};

/**
 * @param {string} make - Optional
 * return all cars if make not provided
 * otherwise, only the cars with the given make
 */
const getAll = async (make) => {
  const cars = await Car.find({
    ...(make && { make }),
  });
  return cars;
};

const getMine = async (owner) => {
  const cars = await Car.find({
    owner: new ObjectId(owner),
  });
  return cars;
};

const getById = async (id) => {
  const car = await Car.findById(id);
  if (!car) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }
  return car;
};

const updateOne = async (id, input) => {
  const updatedCar = await Car.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!updatedCar) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }

  return updatedCar;
};

const deleteOne = async (userId, carId) => {
  const car = await Car.findById(carId);

  if (!car) {
    throw new NotFoundError(`Car with id ${carId} not found`);
  }

  if (car.owner.toString() !== userId.toString()) {
    throw new ForbiddenError(`Not your car`);
  }

  await Car.deleteOne({ _id: new ObjectId(carId) });
  return car;
};

module.exports = {
  create,
  getAll,
  getMine,
  getById,
  updateOne,
  deleteOne,
};
