const { model, Schema } = require('mongoose');
const { validate18Holes } = require('./utils');

const roundSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    scores: {
      type: [Number],
      required: true,
      validate: [validate18Holes, 'scores must be length 18'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Round', roundSchema);
