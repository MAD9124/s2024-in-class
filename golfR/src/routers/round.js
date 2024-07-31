const { Router } = require("express");

const roundController = require("../controllers/round");
const validateRound = require("../middleware/validateRound");
const validateId = require("../middleware/validateId");

const roundRouter = Router();

roundRouter.get("/", roundController.getAll);
roundRouter.get("/:id", validateId, roundController.getOne);
roundRouter.post("/", roundController.create);
roundRouter.put("/:id", validateId, validateRound, roundController.updateOne);
roundRouter.patch("/:id", validateId, roundController.updateOne);
roundRouter.delete("/:id", validateId, roundController.deleteOne);

module.exports = roundRouter;
