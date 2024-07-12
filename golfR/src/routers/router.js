const { Router } = require("express");
const roundController = require("../controllers/controller.js");

const roundRouter = Router();

roundRouter.get("/", roundController.getAll);
roundRouter.get("/:id", roundController.getOne);
roundRouter.post("/", roundController.create);
roundRouter.put("/:id", roundController.replace);
roundRouter.patch("/:id", roundController.update);
roundRouter.delete("/:id", roundController.deleteOne);

module.exports = roundRouter;
