const movieService = require("../services/movies");

const requestHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res);
  } catch (err) {
    next(err);
  }
};

// const create = requestHandler((req, res) => {
//   const movie = movieService.create(req.body);
//   res.status(201).json({ data: movie });
// });

const getAll = requestHandler((req, res) => {
  const { keyword, sort } = req.query;
  const movies = movieService.getAll(keyword, sort);
  res.json({ data: movies });
});

const getOne = requestHandler((req, res) => {
  const id = parseInt(req.params.id, 10);
  const movie = movieService.getById(id);
  res.json({ data: movie });
});

// const replaceOne = requestHandler((req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const updatedMove = movieService.replaceOne(id, req.body);
//   res.json({ data: updatedMove });
// });

// const updateOne = requestHandler((req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const updatedMove = movieService.updateOne(id, req.body);
//   res.json({ data: updatedMove });
// });

// const deleteOne = requestHandler((req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const deletedMovie = movieService.deleteOne(id);
//   res.json({ data: deletedMovie });
// });

const addToFavourites = requestHandler((req, res) => {
  const id = parseInt(req.params.id);
  const movie = movieService.addToFavourites(id);
  res.json({ data: movie });
});

const getFavourites = requestHandler((req, res) => {
  const movies = movieService.getFavourites();
  res.json({ data: movies });
});

module.exports = {
  create,
  getAll,
  getOne,
  replaceOne,
  updateOne,
  deleteOne,
  addToFavourites,
  getFavourites,
};
