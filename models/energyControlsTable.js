const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnergyControlsTable = new Schema({
  controlsId: {
    type: Object,
    required: [true, 'Control field is required']
  },
  controlName: {
    type: String,
  },
  value: {
    type: Number,
    required: [true, 'Value field is required'],
  },
  controlDate: {
    type: String
  },
  monthNumber: {
    type: Number
  },
  userId: {
    type: String,
    required: true
  }
});


const EnergyCtrlTable = mongoose.model('EnergyCtrlTable', EnergyControlsTable);

module.exports = EnergyCtrlTable;
