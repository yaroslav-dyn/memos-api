const NotifDb = require("../models/notif");
const {validationResult} = require("express-validator");

const  notes_index =  async (req, res) => {
  const querySearchStr = Object.keys(req.query).shift();
  let resData
  try {
    if (!querySearchStr) {
      resData = await NotifDb.find().sort({createdAt: -1});
      if (resData) res.send(resData);
    } else {
      let resData = await NotifDb.find();
      const filteredData = resData.filter(item => item.name.toLowerCase().includes(req.query[querySearchStr].toLowerCase()));
      return res.send(filteredData);
    }
  } catch (error) {
    console.log(error);
  }
}

const note_view = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    NotifDb.create(req.body).then(function (memo) {
      res.send(memo);
    }).catch(next);
  }
}

const update_note = async (req, res) => {
  NotifDb.findOneAndUpdate({_id: req.params.id}, req.body).then(function () {
    NotifDb.findOne({_id: req.params.id}).then(function (item) {
      res.send(item);
    });
  });
}

module.exports = {
  notes_index,
  note_view,
  update_note
}
