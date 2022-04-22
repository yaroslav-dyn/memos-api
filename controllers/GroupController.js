const GroupsDb = require("../models/groups");
const { validationResult } = require("express-validator");


const get_groups = async(req, res) => {
  const defaultItem = {name: 'unsorted', readOnly: true, description: '', _id:'00000000'}
  const resData = await GroupsDb.find().where('userId').equals(req.user._id).sort({ name: 1 });
  if (resData) res.send([...resData, defaultItem]);
}
const add_group = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    GroupsDb.create({ ...req.body, userId: req.user._id }).then(function (group) {
      res.send(group);
    }).catch(next);
  }
}

const update_group = async (req, res) => {
  GroupsDb.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (item) {
    res.send(item);
  });
}

const delete_group = async (req, res) => {
  GroupsDb.findOneAndDelete({ _id: req.params.id }).then(function (item) {
    res.send(item)
  });
}


module.exports = {
  get_groups,
  add_group,
  update_group,
  delete_group
}