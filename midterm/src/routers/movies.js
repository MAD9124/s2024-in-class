const { Router } = require("express");

const movieController = require("../controllers/movies");
const {
  requiresMovieSchema,
  movieSchema,
  movieQuery,
} = require("../middleware/validation/movie");
const validateBody = require("../middleware/validation/validateBody");
const validateQuery = require("../middleware/validation/validateQuery");

const movieRouter = Router();

// movieRouter.post(
//   "/",
//   validateBody(requiresMovieSchema),
//   movieController.create
// );
movieRouter.post("/:id/favourite", movieController.addToFavourites);
movieRouter.get("/", validateQuery(movieQuery), movieController.getAll);
movieRouter.get("/favourites", movieController.getFavourites);
movieRouter.get("/:id", movieController.getOne);
// movieRouter.put(
//   "/:id",
//   validateBody(requiresMovieSchema),
//   movieController.replaceOne
// );
// movieRouter.patch("/:id", validateBody(movieSchema), movieController.updateOne);
// movieRouter.delete("/:id", movieController.deleteOne);

module.exports = movieRouter;
