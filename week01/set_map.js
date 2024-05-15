// Sets
const mySet = new Set([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);

// console.log(mySet);
// console.log([1, 2, 3, 4, 5]);

mySet.has(4);
mySet.add(10);
mySet.delete(1);
// console.log(mySet);

// console.log([...[1, 2, 3], 4]);
// remove duplicates from an array via set
// console.log(Array.from(new Set([1, 2, 2, 3])));

// Maps
const myMap = new Map([
  ["a", "a"],
  ["b", 1],
]);
// console.log(myMap.has("a"));
myMap.set("c", "value");
// console.log(myMap);

const pets = [
  // index 0
  {
    id: 1,
    name: "dylan",
    type: "dog",
    tricks: ["sit"],
  },
  // index 1
  {
    id: 2,
    name: "oddy",
    type: "dog",
    tricks: ["speak"],
  },
  // index 2
  {
    id: 3,
    name: "garfield",
    type: "cat",
    tricks: ["eat lasagne"],
  },
  // index 3
  {
    id: 4,
    name: "mickey",
    type: "mouse",
    tricks: ["whistle"],
  },
];

// object entries
const myObj = { a: "A", b: 2 };
console.log(Object.entries(myObj));

const petMap = pets.reduce((acc, cv) => {
  acc.set(cv.id, cv);
  return acc;
}, new Map());
// console.log(petMap);
// console.log(petMap.get(9));

for (const [key, value] of petMap.entries()) {
  console.log(key, value);
}
