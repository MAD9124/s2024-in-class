const { convertJSON } = require("../helpers");

const { Course } = global;

const createCourse = async (course) => {
  const { insertedId } = await Course.insertOne(course);
  return insertedId;
};

const getCourses = async () => {
  const courses = await Course.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } },
  ).toArray();

  return courses.map(convertJSON);
};

module.exports = {
  createCourse,
  getCourses,
};
