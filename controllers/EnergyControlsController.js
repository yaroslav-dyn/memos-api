const EnergyControlsDb = require("../models/energyControls");
const EnergyTableDb = require("../models/energyControlsTable");
const {validationResult} = require("express-validator");
const AccountsDb = require("../models/accounts");


/**
 * Energy controls API Methods
 */
const get_energy_controls = async (req, res) => {
  const resData = await EnergyControlsDb.find().where('userId').equals(req.user._id).sort({ name: 1 })
  if (resData) res.send(resData);
}

const add_energy_controls = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    EnergyControlsDb.create({ ...req.body, userId: req.user._id }).then(function (acc) {
      res.send(acc);
    }).catch(next);
  }
}

const update_energy_controls = async (req, res) => {
  EnergyControlsDb.findOneAndUpdate({ _id: req.params.id }, req.body).then(function () {
    EnergyControlsDb.findOne({ _id: req.params.id }).then(function (control) {
      res.send(control);
    });
  });
}

const delete_energy_controls = async (req, res) => {
  EnergyControlsDb.findOneAndDelete({ _id: req.params.id }).then(function (item) {
    res.send(item)
  });
}

/**
 * Energy table API Methods
 */


module.exports = {
  get_energy_controls,
  add_energy_controls,
  update_energy_controls,
  delete_energy_controls
}
