// BAD! Pascal Case (PascalCase)
// BAD! Don't use snake case (snake_case)
// OK for GLOBAL variables (GLOBAL_VARIABLE)
// Camel case (camelCase)

const BASE_URL = "https://weatherapi/com/";

const testConstant = "tim";
let var2 = "tim2";
var2 = "sam";

const arr = [1, 2, 3];
arr.push(4);
// console.log(var3);

// String
const str = "string";
console.log(str.startsWith("t"));

// Number
const num = 123;
console.log(num.toFixed(2));

// Boolean
const bool = true; // or false
console.log(bool.valueOf());

// Array
const nameArray = ["tim", "brodie", "edan", 1, [], [[[[[]]]]]];
console.log(nameArray.toString());

// Object
const obj = {
  a: "A",
  b: 2,
  c: {
    d: "D",
  },
};
console.log(obj.a);

console.log(global);
