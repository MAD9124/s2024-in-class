const axios = require('axios').default;

const { BadRequestError } = require('../utils/errors');

const { API_KEY } = process.env;

const getWeather = async (city, date) => {
  try {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${date}`
    );

    const { avgtemp_c: temperature, totalprecip_mm: precipitation } =
      data.forecast.forecastday[0].day;

    return {
      temperature,
      precipitation,
    };
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
