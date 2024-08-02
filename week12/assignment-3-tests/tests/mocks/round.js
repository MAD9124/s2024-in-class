const { ObjectId } = require('mongodb');
const { MOCK_COURSE_ID } = require('./course');
const { MOCK_USER_ID } = require('./user');

const MOCK_ROUND_ID = new ObjectId();

const mockRounds = [
  {
    _id: MOCK_ROUND_ID,
    user: MOCK_USER_ID,
    course: MOCK_COURSE_ID,
    scores: [5, 5, 6, 4, 6, 6, 7, 4, 5, 3, 4, 4, 5, 4, 5, 6, 3, 4],
  },
  {
    user: MOCK_USER_ID,
    course: MOCK_COURSE_ID,
    scores: [5, 5, 6, 4, 6, 6, 5, 5, 3, 4, 4, 5, 3, 4, 3, 4, 5, 4],
  },
  {
    user: MOCK_USER_ID,
    course: MOCK_COURSE_ID,
    scores: [5, 5, 6, 4, 6, 6, 7, 4, 3, 5, 7, 4, 4, 5, 6, 3, 4, 3],
  },
  {
    user: MOCK_USER_ID,
    course: MOCK_COURSE_ID,
    scores: [5, 5, 6, 4, 6, 5, 5, 3, 6, 7, 4, 5, 3, 4, 4, 5, 4, 3],
  },
  {
    user: MOCK_USER_ID,
    course: MOCK_COURSE_ID,
    scores: [6, 7, 4, 5, 3, 4, 4, 5, 4, 5, 6, 3, 3, 2, 4, 6, 4, 4],
  },
];

module.exports = {
  mockRounds,
  MOCK_ROUND_ID,
};
