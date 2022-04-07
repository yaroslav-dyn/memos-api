const userDb = require("../models/auth");

const get_profile = async (req, res) => {
  userDb.findOne({ _id: req.user._id }).then(function (item) {
    const { _id, email, nickname } = item;
    res.send({ user: { _id, email, nickname } });
  });
}

const update_profile = async (req, res) => {
  userDb.findOneAndUpdate({ _id: req.params.id }, req.body).then(function (item) {
    const { _id, email, nickname } = item;
    res.send({ user: { _id, email, nickname } });
  });
}

module.exports = {
  get_profile,
  update_profile
}