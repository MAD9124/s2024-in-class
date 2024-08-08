const { ObjectId } = require('mongodb');

const Round = require('../models/round');
const { NotFoundError, ForbiddenError } = require('../utils/errors');

const create = async (userId, input) => {
  const round = new Round({ ...input, user: userId });
  await round.save();
  return round;
};
const getAll = async (userId) => {
  const rounds = await Round.find({
    user: userId,
  })
    .populate('course')
    .populate('user');
  return rounds;
};
const getOne = async (userId, roundId) => {
  const round = await Round.findById(roundId)
    .populate('course')
    .populate('user');

  if (!round) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  if (round.user._id.toString() !== userId.toString()) {
    throw new ForbiddenError('Not your round');
  }

  return round;
};
const updateOne = async (userId, roundId, input) => {
  const round = await Round.findById(roundId);

  if (!round) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  if (round.user._id.toString() !== userId.toString()) {
    throw new ForbiddenError('Not your round');
  }

  const updatedRound = await Round.findByIdAndUpdate(
    roundId,
    { $set: input },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate('course')
    .populate('user');

  return updatedRound;
};

const deleteOne = async (userId, roundId) => {
  const round = await Round.findByIdAndDelete(roundId)
    .populate('course')
    .populate('user');

  if (!round) {
    throw new NotFoundError(`Round with id ${roundId} not found`);
  }

  if (round.user._id.toString() !== userId.toString()) {
    throw new ForbiddenError('Not your round');
  }

  await Round.deleteOne({ _id: new ObjectId(roundId) });

  return round;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
