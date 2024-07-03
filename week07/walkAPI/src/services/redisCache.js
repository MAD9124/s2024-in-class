const redis = require('redis');

const client = redis
  .createClient({
    url: process.env.REDIS_URL,
  })
  .on('error', (err) => {
    console.error(err.message);
  });

const init = async () => {
  await client.connect();
  console.log('Connected to redis');
};

const get = async (key) => {
  const data = await client.get(key);
  if (data) {
    return JSON.parse(data);
  }
};

const set = (key, value) => {
  client.set(key, JSON.stringify(value), {
    // EX: 60 * 5, // 5 minutes
    EX: 60, // 1 minute
  });
};

const encodeKey = (city, date) => `${city}|${date}`;

const getWeather = async (city, date) => {
  return get(encodeKey(city, date));
};

const setWeather = (city, date, data) => {
  set(encodeKey(city, date), data);
};

module.exports = {
  init,
  getWeather,
  setWeather,
};
