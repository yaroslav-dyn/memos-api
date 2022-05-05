const AccountsDb = require("../models/accounts");
const { validationResult } = require("express-validator");


const get_accounts = async (req, res) => {
  const resData = await AccountsDb.find().where('userId').equals(req.user._id).sort({ name: 1 });
  if (resData) res.send(resData);
}
const add_account= async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    AccountsDb.create({ ...req.body, userId: req.user._id }).then(function (acc) {
      res.send(acc);
    }).catch(next);
  }
}

const update_account = async (req, res) => {
  AccountsDb.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
    AccountsDb.findOne({ _id: req.params.id }).then(function (acc) {
      res.send(acc);
    });
  });
}

const delete_account = async (req, res) => {
  AccountsDb.findOneAndDelete({ _id: req.params.id }).then(function (item) {
    res.send(item)
  });
}


module.exports = {
  get_accounts,
  add_account,
  update_account,
  delete_account
}