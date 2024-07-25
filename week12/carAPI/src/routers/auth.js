const { Router } = require('express');
const passport = require('passport');
const { generateToken } = require('../services/tokenService');

const authRouter = Router();

authRouter.get('/login', (_, res) => {
  res.send('login page');
});

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
    session: false,
  }),
  function (req, res) {
    const token = generateToken(req.user);
    res.redirect(`/login-success?token=${token}`);
  }
);

module.exports = authRouter;