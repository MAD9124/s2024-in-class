const myEventEmitter = require("./emitter");

myEventEmitter.on("person_walks_by", () => {
  console.log("CAT - hiss");
  console.log("CAT - run away");
  console.log("CAT - peak out from under the couch");
});
