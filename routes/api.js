const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const NotifDb = require('../models/notif');
const IdeasDb = require('../models/ideas');
const { check, validationResult, sanitizeBody } = require('express-validator');
const NotesController = require('../controllers/NotesController');
const ideasController = require('../controllers/IdeasController');

require('../auth/auth');



/** Signup **/
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
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
          if (err || !user) {
            console.log('err 01', err, user);
            
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);


/** Memos Routes **/
router.get('/memos', NotesController.notes_index);

router.get('/memo/:id', NotesController.note_one);

router.post('/memo', [
  check('name').custom(async value => {
    const checkName = await NotifDb.findOne({ name: value })
    if (checkName) return Promise.reject('Name already taken')
  }),
], NotesController.note_view
);

router.put('/memo/:id', NotesController.update_note);

router.delete('/memo/:id', NotesController.delete_note);
/** End  Memos **/

/** Ideas Routes **/
router.get('/ideas', ideasController.ideas_index);

router.get('/ideas/:id', ideasController.ideas_one);

router.post('/idea', [
  check('group').custom(async value => {
    const checkName = await IdeasDb.findOne({ group: value })
    if (checkName) return Promise.reject('Name already taken')
  }),
], ideasController.idea_view
);

router.put('/idea/:id', ideasController.update_idea);

router.delete('/idea/:id', ideasController.delete_idea);

module.exports = router;
