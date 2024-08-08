const { dropDbs, disconnect } = require("./tests/db");

dropDbs().then(() => disconnect());
