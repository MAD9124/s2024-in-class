const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/user');

passport.use(
  'local',
  new LocalStrategy(async (username, password, done) => {

    try {
      const user = await User.findOne({ username });
      if (!user) {
        console.log('no user');
        return done(null, false);
      }
      if (user.password !== password) {
        console.log('password mismatch');
        return done(null, false);
      }
      console.log('no error?');
      return done(null, user);
    } catch (err) {
      console.error('e', err);
      done(err);
    }
  })
);
