const { disconnect, dropDbs } = require("./db");

const drop = async () => {
  await dropDbs();
  await disconnect();
};
if (process.env.NODE_ENV !== "test") {
  drop();
}
