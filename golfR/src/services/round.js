const Round = require("../models/round");
const { NotFoundError } = require("../utils/errors");

const create = async (input) => {
  const round = new Round(input);
  await round.save();
  return round;
};
const getAll = async () => {
  const rounds = await Round.find().populate("course");
  return rounds;
};
const getOne = async (id) => {
  const round = await Round.findById(id).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};
const updateOne = async (id, input) => {
  const round = await Round.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  }).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};

const deleteOne = async (id) => {
  const round = await Round.findByIdAndDelete(id).populate("course");

  if (!round) {
    throw new NotFoundError(`Round with id ${id} not found`);
  }

  return round;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
