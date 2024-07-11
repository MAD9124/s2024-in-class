const { model, Schema } = require('mongoose');

const carSchema = new Schema(
  {
    make: {
      type: String,
      required: true,
      minLength: 3,
    },
    model: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Car', carSchema);
