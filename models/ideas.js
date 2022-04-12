const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create Schema & model
const ideasSchema = new Schema({
  name: {
    type: String,
  },
  text: {
    type: String,
  },
  group: {
    type: String,
    required: [true, 'Name field is required'],
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  userId: String
},{timestamps: true});


const Ideas = mongoose.model('ideas', ideasSchema);

module.exports = Ideas;
