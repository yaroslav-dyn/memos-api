const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

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
app.use( bodyParser.urlencoded({ extended: false }) );
app.use(bodyParser.json());

//app.use(passport.initialize());
//app.use(passport.session());


const routes = require('./routes/api');
const secureRoute = require('./routes/secure-routes');

//initialize routes
app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});


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
