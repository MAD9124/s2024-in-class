const Joi = require("joi");

const DATE_PATTERN = /\d{4}-\d{2}-\d{2}/;
const IMG_PATTERN = /\/.+\.(png|jpg|jpeg)/;

const movieSchema = {
  adult: Joi.boolean(),
  backdrop_path: Joi.string().pattern(IMG_PATTERN),
  genre_ids: Joi.array().items(Joi.number().integer()),
  id: Joi.number().integer(),
  original_language: Joi.string().valid("en", "fr"),
  original_title: Joi.string(),
  overview: Joi.string(),
  popularity: Joi.number(),
  poster_path: Joi.string().pattern(IMG_PATTERN),
  release_date: Joi.string().pattern(DATE_PATTERN),
  title: Joi.string(),
  video: Joi.boolean(),
  vote_average: Joi.number(),
  vote_count: Joi.number().integer(),
};

const movieQuery = {
  sort: Joi.string().valid("popularity", "release-date", "vote").required(),
  keyword: Joi.string(),
};

module.exports = {
  movieSchema: Joi.object(movieSchema),
  requiresMovieSchema: Joi.object(
    Object.entries(movieSchema).reduce((acc, [key, value]) => {
      acc[key] = value.required();
      return acc;
    }, {})
  ),
  movieQuery: Joi.object(movieQuery),
};
