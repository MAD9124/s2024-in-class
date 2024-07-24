// 1 * 2 * 3 * 4 * 5 = 5!
const factoral = (num) => {
  console.log(num);
  // always set a base case!!!!
  if (num === 1) return 1;
  return factoral(num - 1) * num;
};
console.log(1 * 2 * 3 * 4 * 5);
console.log(factoral(5));
