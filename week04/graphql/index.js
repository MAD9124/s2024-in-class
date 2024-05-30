"use strict";

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const schema = require("./schema.js");

const server = new ApolloServer({
  schema,
});

const PORT = process.env.PORT || 4000;

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT,
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

main();
