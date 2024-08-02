require('dotenv/config');
const mongodb = require('mongodb');
const { convertJSON } = require('../helpers');
const { MOCK_COURSE_ID } = require('../mocks/course');
const { MOCK_USER_ID } = require('../mocks/user');

const client = new mongodb.MongoClient(process.env.MONGO_URL);
const db = client.db(process.env.TEST_DB);

const Course = db.collection('courses');
const Round = db.collection('rounds');
const User = db.collection('users');

const dropDbs = async () => {
  await Course.deleteMany({});
  await Round.deleteMany({});
  await User.deleteMany({});
};

const connect = async () => {
  const connection = await client.connect();
  return async () => {
    await connection.close();
  };
};

const createCourse = async (course) => {
  const { insertedId } = await Course.insertOne(course);
  return insertedId;
};

const getCourses = async () => {
  const courses = await Course.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } }
  ).toArray();

  return courses.map(convertJSON);
};

const createRound = async (round) => {
  const { insertedId } = await Round.insertOne(round);
  return insertedId;
};

const getRoundsRaw = async () => {
  const rounds = await Round.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } }
  ).toArray();

  return rounds.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
    })
  );
};

const getRounds = async () => {
  const rounds = await Round.find(
    {},
    { projection: { updatedAt: 0, createdAt: 0, __v: 0 } }
  ).toArray();

  const course = await Course.findOne({ _id: MOCK_COURSE_ID });
  const user = await User.findOne({ _id: MOCK_USER_ID });

  return rounds.map((p) =>
    convertJSON({
      ...p,
      _id: p._id.toString(),
      course,
      user,
    })
  );
};

const createUser = async (user) => {
  try {
    const { insertedId } = await User.insertOne(user);
    return insertedId;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  connect,
  dropDbs,
  createCourse,
  getCourses,
  createRound,
  getRounds,
  getRoundsRaw,
  createUser,
};
