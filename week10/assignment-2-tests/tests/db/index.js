require("dotenv/config");
const mongodb = require("mongodb");

console.log(process.env.MONGO_URL);
const client = new mongodb.MongoClient(process.env.MONGO_URL);
const db = client.db(process.env.TEST_DB);

global.Course = db.collection("courses");
global.Round = db.collection("rounds");

const courseFns = require("./courses");
const roundFns = require("./rounds");

const dropDbs = async () => {
  await Course.deleteMany({});
  await Round.deleteMany({});
};

const disconnect = async () => {
  client.close();
};

module.exports = {
  disconnect,
  dropDbs,
  ...courseFns,
  ...roundFns,
};
