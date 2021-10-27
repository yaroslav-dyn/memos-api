const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//app setup
const app = express();

//yaroslav-webdev
//123qwe

//connect to MDB
//mongodb://localhost/notif
//mongodb+srv://yaroslav-webdev:123qwe@memo.yzt00.mongodb.net/notif
//mongodb+srv://yaroslav-webdev:123qwe@memo.yzt00.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//mongodb+srv://yaroslav-webdev:123qwe@memo.s7mce.mongodb.net/memo

async function startDb() {
  try {
    await mongoose.connect('mongodb+srv://yaroslav-webdev:123qwe@memo.s7mce.mongodb.net/memo', {
      useNewUrlParser: true,
      useCreateIndex: true,
      autoIndex: true
    });
    console.log('connection to DB');
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

let server = app.listen(process.env.port || 4000, function () {
  console.log('Listen app');
});

//Static files
app.use(express.static('public'));
