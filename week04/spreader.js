const user = {
  id: 1,
  firstName: "tim",
  lastName: "robillard",
  email: "robillt@algonquincollege.com",
  password: "a98yhW0FH2O13DFH108DH13DH8013d18HD0",
  createdAt: "2024-05-30T16:30:00",
};

const update = {
  firstName: "prescott",
};

const userCopy = user;
const userCopy2 = {
  ...user,
  ...update,
};

userCopy.id = 2;
// userCopy2.id = 3;

// console.log(user);
// console.log(userCopy);
// console.log(userCopy2);

const arr = [1, 2, 3, 4];
// console.log([...arr, ...arr, ...arr]);

const { firstName, lastName } = user;
// console.log(`Hello, ${firstName} ${lastName}`);

const arr2 = [1, 2, 3, 4];

const [first, second] = arr2;
console.log(first, second);

const [firstResult, secondResult] = await Promise.all([
    firstLongFunction(),
    secondLongFunction()
])