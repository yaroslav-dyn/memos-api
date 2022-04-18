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
  }
}, { timestamps: true });


const Groups = mongoose.model('notif', NotifSchema);

module.exports = Notif;
