const { Router } = require("express");

const carsController = require("../controllers/cars");
const {
  validateCar,
  partialValidateCar,
} = require("../middlewares/validateCar");

const carsRouter = Router();

carsRouter.post("/", validateCar, carsController.create);
carsRouter.get("/", carsController.getAll);
carsRouter.get("/:id", carsController.getOne);
carsRouter.put("/:id", validateCar, carsController.replaceOne);
carsRouter.patch("/:id", partialValidateCar, carsController.updateOne);
carsRouter.delete("/:id", carsController.deleteOne);

module.exports = carsRouter;
