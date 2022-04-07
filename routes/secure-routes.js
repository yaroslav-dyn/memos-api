const express = require("express");
const NotesController = require("../controllers/NotesController");
const ideasController = require("../controllers/IdeasController");
const ProfileController = require("../controllers/ProfileController");
const {check} = require("express-validator");
const NotifDb = require("../models/notif");
const router = express.Router();


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
/** End  Ideas **/

router.get('/profile', ProfileController.get_profile);

router.put('/profile/:id', ProfileController.update_profile);

module.exports = router;
