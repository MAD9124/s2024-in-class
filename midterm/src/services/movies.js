const { movies } = require('../models/movies.json');
const { BadRequestError, NotFoundError } = require('../utils/errors');
const { getDetailImageUrl, getSearchImageUrl } = require('../utils/images');

const favourites = [];

const sortFunctions = {
  popularity: (a, b) => b.popularity - a.popularity,
  vote: (a, b) => b.vote_average - a.vote_average,
  'release-date': (a, b) =>
    new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf(),
};

const toDTO = (movie) => ({
  ...movie,
  imageUrl: getDetailImageUrl(movie.poster_path),
});

const create = (body) => {
  const newMovie = {
    ...body,
    id: Date.now(),
  };

  movies.push(newMovie);

  return newMovie;
};

const getAll = (keyword, sort) => {
  return movies
    .filter((movie) =>
      movie.title.toLowerCase().includes((keyword ?? '').toLowerCase())
    )
    .sort(sortFunctions[sort])
    .slice(0, 10)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      imageUrl: getSearchImageUrl(movie.poster_path),
    }));
};

const getById = (id) => {
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }

  return toDTO(movie);
};

const replaceOne = (id, updates) => {
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }
  const update = {
    ...updates,
    id,
  };

  movies[movieIndex] = update;

  return toDTO(update);
};

const updateOne = (id, updates) => {
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }
  const update = {
    ...movies[movieIndex],
    ...updates,
    id,
  };

  movies[movieIndex] = update;

  return toDTO(update);
};

const deleteOne = (id) => {
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }

  const [deletedMovie] = movies.splice(movieIndex, 1);

  return toDTO(deletedMovie);
};

const addToFavourites = (id) => {
  const movie = movies.find((movie) => movie.id === id);

  if (!movie) {
    throw new NotFoundError(`Movie with id ${id} not found`);
  }

  const favourite = favourites.find((fav) => fav.id === id);
  if (!favourite) {
    favourites.push(movie);
  }

  return toDTO(movie);
};

const getFavourites = () => {
  return favourites.map(toDTO);
};

module.exports = {
  create,
  getAll,
  getById,
  replaceOne,
  updateOne,
  deleteOne,
  addToFavourites,
  getFavourites,
};
