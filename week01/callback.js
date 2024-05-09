const testFunc = (str, callback) => {
  callback(str);
};

testFunc("tim", (str) => {
  console.log(str + " is cool");
});

testFunc("tim", (str) => {
  console.log(str + " has a daughter");
});

const fakeDBCall = (id, cb) => {
  if (id === 1) {
    cb("tim");
  } else {
    cb("diego");
  }
};

const printName = (id) => {
  fakeDBCall(id, (name) => {
    console.log(`my name is ${name}`);
  });
};

const addNameToList = (id) => {
  const names = [];
  fakeDBCall(id, (name) => {
    names.push(name);
  });
};

printName(1);

const user = {
  id: 1,
  firstName: "tim",
  lastName: "robillard",
};
