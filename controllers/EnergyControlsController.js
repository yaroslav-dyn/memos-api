const EnergyControlsDb = require("../models/energyControls");
const EnergyTableDb = require("../models/energyControlsTable");
const {validationResult} = require("express-validator");


/**
 * Energy controls API Methods
 */
const get_energy_controls = async (req, res) => {
  try {
    const resData = await EnergyControlsDb.find().where('userId').equals(req.user._id).sort({name: 1})
    if (resData) res.send(resData);
  } catch (error) {
    console.log(error);
  }

}

const add_energy_controls = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    EnergyControlsDb.create({...req.body, userId: req.user._id}).then(function (acc) {
      res.send(acc);
    }).catch(next);
  }
}

const update_energy_controls = async (req, res) => {
  EnergyControlsDb.findOneAndUpdate({_id: req.params.id}, req.body).then(function () {
    EnergyControlsDb.findOne({_id: req.params.id}).then(function (control) {
      res.send(control);
    });
  });
}

const delete_energy_controls = async (req, res) => {
  EnergyControlsDb.findOneAndDelete({_id: req.params.id}).then(function (item) {
    res.send(item)
  });
}

/**
 * Energy table API Methods
 */
const get_energy_controls_table = async (req, res) => {
  let resData;
  if (req.params && req.params.hasOwnProperty('month')) {
    resData = await EnergyTableDb.find()
        .where('userId').equals(req.user._id)
        .where('monthNumber').equals(req.params.month)
  } else {
    resData = await EnergyTableDb.find()
        .where('userId').equals(req.user._id)
  }

  if (resData) res.send(resData);
}

const add_energy_controls_item = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  } else {
    EnergyTableDb.create({...req.body, userId: req.user._id}).then(function (acc) {
      res.send(acc);
    }).catch(next);
  }
}

const update_energy_controls_table = async (req, res) => {
  EnergyTableDb.findOneAndUpdate({_id: req.params.id}, req.body).then(function () {
    EnergyTableDb.findOne({_id: req.params.id}).then(function (control) {
      res.send(control);
    });
  });
}

const delete_energy_controls_table = async (req, res) => {
  EnergyTableDb.findOneAndDelete({_id: req.params.id}).then(function (item) {
    res.send(item)
  });
}

module.exports = {
  get_energy_controls,
  add_energy_controls,
  update_energy_controls,
  delete_energy_controls,
  get_energy_controls_table,
  add_energy_controls_item,
  update_energy_controls_table,
  delete_energy_controls_table

}
