const validateQuery = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query);
  if (!error) {
    req.body = value;
    return next();
  }
  console.log("e", error);
  res.status(400).json({
    error: {
      message: "Invalid Query: " + error.details[0].message,
    },
  });
};

module.exports = validateQuery;
