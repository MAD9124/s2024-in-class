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
      minLength: 6,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: String,
    lastName: String,
    profilePic: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('User', userSchema);
