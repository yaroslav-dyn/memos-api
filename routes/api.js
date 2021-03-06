const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

require('../auth/auth');

router.get('/status', function (req, res) {
  //res.send({ type: 'GET' })
  res.send({
    message: 'You made it to the secure route',
    user: req.user,
    token: req.query.secret_token
  })
});

/** Signup **/
router.post(
  '/signup',
  passport.authenticate('signup', {session: false}),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

/** Login **/
router.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if( !user || err ) {   
            return next({...info, status: 403});
          }  
          req.login(
            user,
            {session: false},
            async (error) => {
              if (error) return next(error);
              const body = {_id: user._id, email: user.email};
              const token = jwt.sign({user: body}, 'TOP_SECRET');
              return res.json({success: true, token, message: info && info.message});
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

module.exports = router;
