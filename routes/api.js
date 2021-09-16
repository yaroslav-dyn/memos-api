const express = require('express');
const router = express.Router();
const NotifDb = require('../models/notif');
const {check, validationResult, sanitizeBody} = require('express-validator');

router.get('/status', function (req, res) {
  res.send({type: 'GET'})
});

router.get('/memos', async function (req, res) {
  const querySearchStr = req.query;
  let resData
  console.log(querySearchStr);
  try {
    if(!querySearchStr.name) {
      resData = await NotifDb.find().sort({createdAt: -1});
      if(resData) res.send(resData);
    }
  } catch (error) {
    console.log(error);
  }

});


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
    ],
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()})
      } else {
        NotifDb.create(req.body).then(function (memo) {
          res.send(memo);
        }).catch(next);
      }
    }
);

router.put('/memo/:id', function (req, res) {
  NotifDb.findByIdAndUpdate({_id: req.params.id}, req.body).then(function () {
    NotifDb.findOne({_id: req.params.id}).then(function (item) {
      res.send(item);
    });
  });

});

router.delete('/memo/:id', function (req, res) {
  NotifDb.findByIdAndDelete({_id: req.params.id}).then(function (item) {
    res.send(item)
  });

});

module.exports = router;
