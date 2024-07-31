const { model, Schema } = require("mongoose");
const { validate18Holes } = require("./utils");

const holeSchema = new Schema(
  {
    par: {
      type: Number,
      min: 3,
      max: 5,
      required: true,
    },
    distance: {
      type: Number,
      min: 0,
      max: 1000,
      required: true,
    },
  },
  {
    versionKey: false,
    _id: false,
  },
);

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 250,
    },
    holes: {
      type: [holeSchema],
      required: true,
      validate: [validate18Holes, "holes must be length 18"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model("Course", courseSchema);
