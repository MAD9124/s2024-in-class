const myName = "tim";

const capitalizeName = (name) => name[0].toUpperCase() + name.substring(1);

const sayHello = (str) => {
  console.log(`Hello, ${capitalizeName(str)}`);
};

module.exports = {
  name: myName,
  sayHello,
};
