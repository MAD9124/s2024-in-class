require("dotenv/config");
const mongodb = require("mongodb");

const client = new mongodb.MongoClient(process.env.MONGO_URL);
const db = client.db(process.env.TEST_DB);

global.User = db.collection("users");
global.Crap = db.collection("craps");

const crapFns = require("./crap");
const userFns = require("./users");

const dropDbs = async () => {
  await User.deleteMany({});
  await Crap.deleteMany({});
};

const disconnect = async () => {
  client.close();
};

module.exports = {
  disconnect,
  dropDbs,
  ...crapFns,
  ...userFns,
};
