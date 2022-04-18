const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema & model
const GroupsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    required: true
  }
});


const Groups = mongoose.model('group', GroupsSchema);

module.exports = Groups;
