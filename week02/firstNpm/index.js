const axios = require("axios").default;
// const lodash = require("lodash");

const main = async () => {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
  console.log(response);
};

main();

// console.log(lodash.startCase("timRobillard"));

// console.log(
//   lodash.groupBy(
//     [`
//       { id: 1, grade: "B", me: "tim" },
//       { id: 2, grade: "B", me: "vincent" },
//       { id: 3, grade: "A", me: "diego" },
//       { id: 4, grade: "A", me: "veronika" },
//       { id: 5, grade: "A", me: "anna" },
//     ],
//     "grade"
//   )
// );
