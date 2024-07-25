const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('User', userSchema);
