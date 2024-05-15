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

// for (let i = 0; i < pets.length; i++) {
//   console.log(pets[i]);
// }

// pet === value
// for (const pet of pets) {
//   console.log(pet);
// }

// pet === index
// for (const pet in pets) {
//   console.log(pet);
// }

// forEach
pets.forEach((pet, i) => {
  //   console.log(pet);
  //   console.log(index);
  // console.log(fullArray);
});

// map
const petNames = pets.map((pet) => pet.name);
// console.log(petNames);

// console.log(Boolean(''))
// console.log(Boolean('123'))
// console.log(Boolean(0))
// console.log(Boolean(-1))
// console.log(Boolean(1))
// console.log(Boolean([]))
// console.log(Boolean({}))

// find
const foundPet = pets.find(({ id }) => id === "1");
// console.log(foundPet);

// filter
const allDogs = pets.filter(({ type }) => type === "dog");
// console.log(allDogs);

// some
const petNameStartWithM = pets.some(({ name }) => name.startsWith("m"));
// console.log(petNameStartWithM);

// every
const allPetsAreDogs = pets.every(({ type }) => type === "dog");
// console.log(allPetsAreDogs);

// reduce
// const str = ["a", "b", "c", "d", "e"].reduce((acc, cv) => acc + cv);
// console.log(str);
const str = ["a", "b", "c", "d", "e"].reduce(
  (acc, cv) => acc + cv,
  "Tim can say the alphabet "
);
// console.log(str);

const total = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((acc, cv) => acc + cv);
console.log(total);

const petMap = pets.reduce((acc, cv) => {
  acc[cv.id] = cv;
  return acc;
}, {});
// console.log(petMap[2]);
