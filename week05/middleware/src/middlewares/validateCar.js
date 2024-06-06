const approvedColours = [
  "red",
  "yellow",
  "orange",
  "green",
  "blue",
  "purple",
  "white",
  "black",
];

const validateCar = (req, res, next) => {
  const { make, model, colour } = req.body;
  if (!make || !model || !colour) {
    res.status(400).json({
      error: {
        message: `make, model and colour required`,
      },
    });
    return;
  }
  if (make.length < 3) {
    res.status(400).json({
      error: {
        message: "make must be 3 characters or more",
      },
    });
    return;
  }
  if (model.length < 1) {
    res.status(400).json({
      error: {
        message: "model must be 1 character or more",
      },
    });
    return;
  }
  if (!approvedColours.includes(colour.toLowerCase())) {
    res.status(400).json({
      error: {
        message: `must be an approved colour: ${approvedColours.join(", ")}`,
      },
    });
    return;
  }
  req.body = {
    make,
    model,
    colour,
  };
  next();
};

const partialValidateCar = (req, res, next) => {
  const { make, model, colour } = req.body;
  if (!make && !model && !colour) {
    res.status(400).json({
      error: {
        message: "nothing to update",
      },
    });
    return;
  }
  if (make && make.length < 3) {
    res.status(400).json({
      error: {
        message: "make must be 3 characters or more",
      },
    });
    return;
  }
  if (model && model.length < 1) {
    res.status(400).json({
      error: {
        message: "model must be 1 character or more",
      },
    });
    return;
  }
  if (colour && !approvedColours.includes(colour.toLowerCase())) {
    res.status(400).json({
      error: {
        message: `must be an approved colour: ${approvedColours.join(", ")}`,
      },
    });
    return;
  }
  next();
};

module.exports = {
  validateCar,
  partialValidateCar,
};
