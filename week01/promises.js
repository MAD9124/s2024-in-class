// console.log(1);
// const myPromise = new Promise((resolve, reject) => {
//   console.log(2);
//   resolve(true);
// });
// console.log(
//   myPromise
//     .then((value) => {
//       console.log("3", value);
//     })
//     .catch((err) => console.warn(err))
//     .finally(() => {
//       console.log("finally");
//     })
// );
// console.log(4);

const myPromiseFun = async (bool) => {
  if (bool) {
    return "yay";
  }
  throw new Error("Not yay");
};

const myAsyncFunction = async () => {
  try {
    const value = await myPromiseFun(false);
    console.log(value);
  } catch (error) {
    console.log("an error occured");
  } finally {
    console.log("finally");
    // database.close()
  }
};

myAsyncFunction();
