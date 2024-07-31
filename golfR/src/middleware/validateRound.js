const Round = require("../models/round");

const validateRound = async (req, _res, next) => {
  try {
    const round = new Round(req.body);
    await round.validate();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateRound;
