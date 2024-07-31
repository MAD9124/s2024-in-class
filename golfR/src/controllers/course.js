const courseService = require("../services/course");
const requestHandler = require("../utils/requestHandler");

const getAll = requestHandler(async (_req, res) => {
  const courses = await courseService.getAll();
  res.json({ data: courses });
});

const getOne = requestHandler(async (req, res) => {
  const course = await courseService.getOne(req.params.id);
  res.json({ data: course });
});

const create = requestHandler(async (req, res) => {
  const course = await courseService.create(req.body);
  res.status(201).json({ data: course });
});

const updateOne = requestHandler(async (req, res) => {
  const course = await courseService.updateOne(req.params.id, req.body);
  res.json({ data: course });
});

const deleteOne = requestHandler(async (req, res) => {
  const course = await courseService.deleteOne(req.params.id);
  res.json({ data: course });
});

module.exports = { getAll, getOne, create, updateOne, deleteOne };
