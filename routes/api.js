const express = require('express');
const router = express.Router();
const NotifDb = require('../models/notif');

router.get('/status', function (req, res) {
    res.send({type: 'GET',db: 'Some db'})
});

router.get('/memos', function (req, res) {
  NotifDb.find()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
});

router.post('/memo', function (req, res, next) {
    NotifDb.create(req.body).then(function (memo) {
        res.send(memo);
    }).catch(next);
});

router.put('/memo/:id', function (req, res) {

    NotifDb.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {

      NotifDb.findOne({_id: req.params.id}).then(function (ninja) {
            res.send(ninja);
        });
    });

});

router.delete('/memo/:id', function (req, res) {

    NotifDb.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
        res.send(ninja)
    });

});

module.exports = router;
