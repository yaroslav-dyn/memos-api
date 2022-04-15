const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create Schema & model
const NotifSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false
  },
  group: {
    type: String,
    default: 'unsorted'
  },
  userId: String
},{timestamps: true});


const Notif = mongoose.model('notif', NotifSchema);

module.exports = Notif;
