const express = require('express');
const router = express.Router();
const NotifDb = require('../models/notif');
const IdeasDb = require('../models/ideas');
const {check, validationResult, sanitizeBody} = require('express-validator');
const NotesController = require('../controllers/NotesController');
const ideasController = require('../controllers/IdeasController');

/** Check API Status **/
router.get('/status', function (req, res) {
  res.send({type: 'GET'})
});


/** Memos Routes **/
router.get('/memos', NotesController.notes_index);

router.get('/memo/:id', NotesController.note_one);

router.post('/memo', [
      check('name').custom(async value => {
        const checkName = await NotifDb.findOne({name: value})
        if(checkName) return Promise.reject('Name already taken')
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
      const checkName = await IdeasDb.findOne({group: value})
      if(checkName) return Promise.reject('Name already taken')
    }),
  ], ideasController.idea_view
);

router.put('/idea/:id', ideasController.update_idea);

router.delete('/idea/:id', ideasController.delete_idea);

module.exports = router;
