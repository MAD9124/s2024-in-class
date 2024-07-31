const Course = require("../models/course");
const { NotFoundError } = require("../utils/errors");

const create = async (input) => {
  const course = new Course(input);
  console.log("!", input);
  await course.save();
  return course;
};
const getAll = async () => {
  const courses = await Course.find();
  return courses;
};
const getOne = async (id) => {
  const course = await Course.findById(id);

  if (!course) {
    throw new NotFoundError(`course with id ${id} not found`);
  }

  return course;
};
const updateOne = async (id, input) => {
  const course = await Course.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    throw new NotFoundError(`course with id ${id} not found`);
  }

  return course;
};

const deleteOne = async (id) => {
  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    throw new NotFoundError(`course with id ${id} not found`);
  }

  return course;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
  deleteOne,
};
