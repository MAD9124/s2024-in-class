const myEventEmitter = require("./emitter");

myEventEmitter.on("person_walks_by", () => {
  console.log("DOG - get exited");
  console.log("DOG - bark");
  console.log("DOG - come running for a pat");
});
