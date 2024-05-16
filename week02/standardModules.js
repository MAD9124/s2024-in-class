const os = require("os");
const path = require("path");
const fs = require("fs");
// const process = require('process')

// console.log(os.version())

// testing process

// console.log(process.env.NODE_ENV);

// console.log("1");
// process.exit(1);
// console.log("2");

// testing path

// console.log(__dirname);
// console.log(path.basename(__dirname));
// console.log(path.join(__dirname, "../week01/some-file.txt"));

// testing fs

const testFs = async () => {
  console.log("1");
  try {
    // await fs.writeFile(
    //   path.join(__dirname, "./data/output.csv"),
    //   "name,age,class\nadam,30,MAD9124\nvictor,22,MAD924"
    // );
    const myData = await fs.readFile(path.join(__dirname, "./output.csv"));
    console.log(
      myData
        .toString()
        .split("\n")
        .map((d) => {
          const [name, age, className] = d.split(",");
          return {
            name,
            age,
            class: className,
          };
        })
    );
  } catch (e) {
    console.log(e);
  }

  console.log("2");
};
testFs();
