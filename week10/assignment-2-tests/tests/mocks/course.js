const { ObjectId } = require("mongodb");

const MOCK_COURSE_ID = new ObjectId("65f4b6e63d390f0884f0e107");

const mockCourses = [
  {
    _id: MOCK_COURSE_ID,
    name: "Manderley Central North",
    holes: [
      {
        par: 5,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
    ],
  },
  {
    name: "Greensmeer Legacy Course",
    holes: [
      {
        par: 4,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 5,
        distance: 300,
      },
      {
        par: 3,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
      {
        par: 4,
        distance: 300,
      },
    ],
  },
];

module.exports = {
  MOCK_COURSE_ID,
  mockCourses,
};
