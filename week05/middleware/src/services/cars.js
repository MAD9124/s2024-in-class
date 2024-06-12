const cars = require("../models/cars");
const { NotFoundError } = require("../utils/errors");

const create = (input) => {
  const newCar = {
    ...input,
    // not 100% unique
    // close enough for testing
    id: Date.now(),
  };

  // add to the cars array
  cars.push(newCar);
  return newCar;
};

const getAll = () => cars;

const getById = (id) => {
  const car = cars.find((car) => car.id === Number(id));
  if (!car) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }
  return car;
};

module.exports = {
  create,
  getAll,
  getById,
};
