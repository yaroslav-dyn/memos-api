const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema & model
const AccountsSchema = new Schema({
  type: {
    type: String,
    required: [true, 'Type field is required'],
  },
  value: {
    type: String,
  },
  userId: {
    type: String,
    required: true
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});


const Accounts = mongoose.model('account', AccountsSchema);

module.exports = Accounts;
