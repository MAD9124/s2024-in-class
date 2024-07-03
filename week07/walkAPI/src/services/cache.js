const cache = {};

const set = (key, value) => {
  cache[key] = value;
};

const get = (key) => {
  return cache[key];
};

const encodeKey = (city, date) => `${city}:${date}`;

const setWeather = (city, date, data) => {
  return set(encodeKey(city, date), data);
};

const getWeather = (city, date) => {
  return get(encodeKey(city, date));
};

module.exports = {
  setWeather,
  getWeather,
};
