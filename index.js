const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//app setup
const app = express();

//yaroslav-webdev
//123qwe

//connect to MDB
//mongodb://localhost/notif
//mongodb+srv://yaroslav-webdev:123qwe@memo.s7mce.mongodb.net/memo

const localDb = 'mongodb+srv://yaroslav-webdev:123qwe@memo.s7mce.mongodb.net/memo';
const dataDbUrl = process.env.MONGODB_URL || localDb; //localhost/notif

async function startDb() {
  try {
    await mongoose.connect(dataDbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: true
    });
    console.log('connection to server DB');
  } catch(error) {
    console.log('Error DB', error);
  }
}

startDb();

mongoose.Promise = global.Promise;

app.use(cors())
app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));


//error handler

app.use(function (err, req, res, next) {
  console.log(err);

  res.status(422).send({error: err.message});
});

let API_PORT = process.env.PORT || 4000


let server = app.listen( API_PORT, function () {
  console.log('Listen app');
});

//Static files
app.use(express.static('public'));
