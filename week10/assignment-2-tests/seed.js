const { mockCourses } = require("./tests/mocks/course");
const { mockRounds } = require("./tests/mocks/round");
const { createCourse, createRound, disconnect } = require("./tests/db");

const main = async () => {
  await Promise.all([
    ...mockCourses.map(createCourse),
    ...mockRounds.map(createRound),
  ]);
  await disconnect();
};

main();
