const roundService = require("../services/round");
const requestHandler = require("../utils/requestHandler");

const getAll = requestHandler(async (_req, res) => {
  const rounds = await roundService.getAll();
  res.json({ data: rounds });
});

const getOne = requestHandler(async (req, res) => {
  const round = await roundService.getOne(req.params.id);
  res.json({ data: round });
});

const create = requestHandler(async (req, res) => {
  const round = await roundService.create(req.body);
  res.status(201).json({ data: round });
});

const updateOne = requestHandler(async (req, res) => {
  const round = await roundService.updateOne(req.params.id, req.body);
  res.json({ data: round });
});

const deleteOne = requestHandler(async (req, res) => {
  const round = await roundService.deleteOne(req.params.id);
  res.json({ data: round });
});

module.exports = { getAll, getOne, create, updateOne, deleteOne };
