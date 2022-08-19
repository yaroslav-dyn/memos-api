const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnergyControls = new Schema({
  name: {
    type: String,
  },
  digitCount: {
    type: Number
  },
  decimalCount: {
    type: Number
  },
  unit: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
});

const EnergyCtrl = mongoose.model('energyControls', EnergyControls);

module.exports = EnergyCtrl;
