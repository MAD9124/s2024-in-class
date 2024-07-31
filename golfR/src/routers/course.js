const { Router } = require("express");
const courseController = require("../controllers/course");
const validateCourse = require("../middleware/validateCourse");
const validateId = require("../middleware/validateId");

const courseRouter = Router();

courseRouter.post("/", courseController.create);
courseRouter.get("/", courseController.getAll);
courseRouter.get("/:id", validateId, courseController.getOne);
courseRouter.put(
  "/:id",
  validateId,
  validateCourse,
  courseController.updateOne,
);
courseRouter.patch("/:id", validateId, courseController.updateOne);
courseRouter.delete("/:id", validateId, courseController.deleteOne);

module.exports = courseRouter;
