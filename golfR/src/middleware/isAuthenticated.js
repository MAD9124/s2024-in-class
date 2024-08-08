const passport = require('passport');

const isAuthenticated = (req, res, next) =>
  passport.authenticate('bearer', {
    session: false,
    failureRedirect: '/auth/login',
    failWithError: true,
  })(req, res, (e) => {
    if (e) {
      console.warn('e', e);
      res.status(401).json({
        error: {
          message: 'Unauthenticated',
        },
      });
      return;
    }
    next();
  });

module.exports = isAuthenticated;
