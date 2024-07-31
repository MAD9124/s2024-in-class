const { isValidObjectId } = require("mongoose");

const { BadRequestError } = require("../utils/errors");

const validateId = (req, _res, next) => {
  if (!isValidObjectId(req.params.id)) {
    throw new BadRequestError("Invalid id");
  }
  next();
};

module.exports = validateId;
