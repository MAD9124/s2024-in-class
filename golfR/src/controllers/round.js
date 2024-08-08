const roundService = require('../services/round');
const requestHandler = require('../utils/requestHandler');

const getAll = requestHandler(async (req, res) => {
  const rounds = await roundService.getAll(req.user._id);
  res.json({ data: rounds });
});

const getOne = requestHandler(async (req, res) => {
  const round = await roundService.getOne(req.user._id, req.params.id);
  res.json({ data: round });
});

const create = requestHandler(async (req, res) => {
  const round = await roundService.create(req.user._id, req.body);
  res.status(201).json({ data: round });
});

const updateOne = requestHandler(async (req, res) => {
  const round = await roundService.updateOne(
    req.user._id,
    req.params.id,
    req.body
  );
  res.json({ data: round });
});

const deleteOne = requestHandler(async (req, res) => {
  const round = await roundService.deleteOne(req.user._id, req.params.id);
  res.json({ data: round });
});

module.exports = { getAll, getOne, create, updateOne, deleteOne };
