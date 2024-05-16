"use strict";

const http = require("http");

const server = http.createServer((request, response) => {
  if (request.url === "/api") {
    const data = {
      message: "Hello world from Node.js!",
    };
    response.statusCode = 201;
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(data));
  } else {
    response.statusCode = 404;
    response.write("404 | Page not found");
  }
  response.end();
});

server.listen(4000, (err) => {
  if (err) {
    return console.log("something went wrong", err);
  }
  console.log("server listening on port 4000 ...");
});
