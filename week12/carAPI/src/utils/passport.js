const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: BearerStrategy } = require('passport-http-bearer');

// TODO move bcrypt into a user service
const bcrypt = require('bcrypt');

const User = require('../models/user');
const tokenService = require('../services/tokenService');

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

passport.use(
  new BearerStrategy(function (token, done) {
    try {
      const user = tokenService.verifyToken(token);
      console.log('u', user);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  })
);
