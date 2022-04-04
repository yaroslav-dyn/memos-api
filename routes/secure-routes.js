const express = require('express');
const NotesController = require("../controllers/NotesController");
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

module.exports = router;
