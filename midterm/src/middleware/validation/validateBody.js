const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (!error) {
    req.body = value;
    return next();
  }
  console.log("e", error);
  res.status(400).json({
    error: {
      message: "Invalid Body" + error.details[0].message,
    },
  });
};

module.exports = validateBody;
