const axios = require('axios').default;

const cacheService = require('./cache');
const { BadRequestError } = require('../utils/errors');

const { API_KEY } = process.env;

const getWeather = async (city, date) => {
  const cachedValue = cacheService.getWeather(city, date);

  if (cachedValue) {
    return cachedValue;
  }

  try {
    console.log('MAking request to the API');
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`
    );

    const { avgtemp_c: temperature, totalprecip_mm: precipitation } =
      data.forecast.forecastday[0].day;

    const weatherData = {
      temperature,
      precipitation,
    };

    cacheService.setWeather(city, date, weatherData);
    return weatherData;
  } catch (err) {
    if (err.response.status === 400) {
      throw new BadRequestError(err.response.data.error.message);
    }
    throw err;
  }
};

module.exports = {
  getWeather,
};
