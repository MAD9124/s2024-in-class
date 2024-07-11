const Car = require('../models/cars');
const { NotFoundError } = require('../utils/errors');

const create = async (input) => {
  const newCar = new Car(input);
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

const deleteOne = async (id) => {
  const deletedCar = await Car.findByIdAndDelete(id);

  if (!deletedCar) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }

  return deletedCar;
};

module.exports = {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
};
