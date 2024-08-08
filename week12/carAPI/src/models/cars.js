const { model, Schema, Types } = require('mongoose');

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
    images: {
      type: [String],
      validate: [(imgs) => imgs.length > 0, 'Must have at least 1 image'],
    },
    owner: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Car', carSchema);
