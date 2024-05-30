const { Router } = require("express");

const carsController = require("../controllers/cars");

const carsRouter = Router();

carsRouter.post("/", carsController.create);
carsRouter.get("/", carsController.getAll);
carsRouter.get("/:id", carsController.getOne);
carsRouter.put("/:id", carsController.replaceOne);
carsRouter.patch("/:id", carsController.updateOne);
carsRouter.delete("/:id", carsController.deleteOne);

module.exports = carsRouter;
