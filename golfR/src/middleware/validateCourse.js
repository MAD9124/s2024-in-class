const Course = require("../models/course");

const validateCourse = async (req, _res, next) => {
  try {
    const course = new Course(req.body);
    await course.validate();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateCourse;
