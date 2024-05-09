// immediately invoked function
// (() => {
//   console.log("right away");
// })();

const multiplyTwoNumbers = (a, b) => {
  return a * b;
};

const result1 = addTwoNumbers(1, 1);
// console.log(result1);
const result2 = addTwoNumbers(1, 2);
// console.log(result2);
const result3 = addTwoNumbers(10, -1);
// console.log(result3);
const result4 = multiplyTwoNumbers(3, 5);
// console.log(result4);
const result5 = multiplyTwoNumbers(10000, 123121);
// console.log(result5);

function addTwoNumbers(a, b) {
  return a + b;
}

function thisTest() {
  console.log("function way", this);
}

const thisTest2 = () => {
  console.log("arrow way", this);
};

const myObj = {
  func: thisTest,
  arrow: thisTest2,
};

myObj.func();
myObj.arrow();
