const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

// TODO move bcrypt into a user service
const bcrypt = require('bcrypt');

const User = require('../models/user');

passport.use(
  'local',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username }).lean();
      if (!user) {
        return done(null, false);
      }
      const passwordsMatch = await bcrypt.compareSync(password, user.password);
      if (!passwordsMatch) {
        return done(null, false);
      }

      delete user.password;
      return done(null, user);
    } catch (err) {
      console.error('e', err);
      done(err);
    }
  })
);
