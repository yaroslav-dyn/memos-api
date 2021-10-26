const express = require('express');
const router = express.Router();
const NotifDb = require('../models/notif');
const {check, validationResult, sanitizeBody} = require('express-validator');
const NotesController = require('../controllers/NotesController');

router.get('/status', function (req, res) {
  res.send({type: 'GET'})
});

router.get('/memos', NotesController.notes_index);

router.get('/memo/:id', function (req, res) {
  NotifDb.findOne({_id: req.params.id})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

router.post('/memo', [
      check('name').custom(async value => {
        const checkName = await NotifDb.findOne({name: value})
        if(checkName) return Promise.reject('Name already taken')
      }),
    ], NotesController.note_view
);

router.put('/memo/:id', NotesController.update_note);

router.delete('/memo/:id', function (req, res) {
  NotifDb.findByIdAndDelete({_id: req.params.id}).then(function (item) {
    res.send(item)
  });

});

module.exports = router;
