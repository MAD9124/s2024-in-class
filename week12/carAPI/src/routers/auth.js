const { Router } = require('express');
const passport = require('passport');

const authRouter = Router();

authRouter.get('/login', (_, res) => {
  res.send('login page');
});

authRouter.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    session: false,
  }),
  function (req, res) {
    console.log(req.user);
    res.redirect(`/login-success?token=${token}`);
  }
);

module.exports = authRouter;
