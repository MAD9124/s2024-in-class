const { convertJSON } = require("../helpers");
const { MOCK_COURSE_ID } = require("../mocks/course");

const { Course, Round } = global;

const createRound = async (round) => {
  const { insertedId } = await Round.insertOne(round);
  return insertedId;
};

const getRoundsRaw = async () => {
  const rounds = await Round.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } },
  ).toArray();

  return rounds.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
    }),
  );
};

const getRounds = async () => {
  const rounds = await Round.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } },
  ).toArray();

  const course = await Course.findOne({ _id: MOCK_COURSE_ID });

  return rounds.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
      course,
    }),
  );
};

module.exports = {
  createRound,
  getRoundsRaw,
  getRounds,
};
