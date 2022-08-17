const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnergyControlsTable = new Schema({
  controlsId: {
    type: String,
    required: [true, 'Control field is required']
  },
  value: {
    type: Number,
    required: [true, 'Value field is required'],
  },
  userId: {
    type: String,
    required: true
  }
});


const EnergyCtrlTable = mongoose.model('EnergyCtrlTable', EnergyControlsTable);

module.exports = EnergyCtrlTable;
