const { students } = require("./students.json");

// console.log(students.map(({ firstName }) => firstName));

console.log(
  JSON.stringify({
    a: "A",
    b: 2,
  })
);
console.log(JSON.parse('{"a":"A","b":2}'));
