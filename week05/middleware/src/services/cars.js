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

const replaceOne = (id, input) => {
  const carIndex = cars.findIndex((car) => car.id === id);
  if (carIndex === -1) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }
  const updatedCar = {
    ...input,
    id,
  };
  cars[carIndex] = updatedCar;
  return updatedCar;
};

const updateOne = (id, { make, model, colour }) => {
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }

  const updatedCar = {
    ...cars[carIndex],
    // spread undefined (nothing) if undefined
    // add make to the object if defined
    ...(make && { make }),
    ...(model && { model }),
    ...(colour && { colour }),
  };

  cars[carIndex] = updatedCar;
  return updatedCar;
};

const deleteOne = (id) => {
  const carIndex = cars.findIndex((car) => car.id === id);

  if (carIndex === -1) {
    throw new NotFoundError(`Car with id ${id} not found`);
  }
  const [deletedCar] = cars.splice(carIndex, 1);
  return deletedCar;
};

module.exports = {
  create,
  getAll,
  getById,
  replaceOne,
  updateOne,
  deleteOne,
};
