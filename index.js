const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();

//app setup
const app = express();


const localDb = process.env.LOCAL_DB_URL;
const dataDbUrl = process.env.MONGODB_URL || localDb;

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

let API_PORT = process.env.PORT || 4000


let server = app.listen( API_PORT, function () {
  console.log('Listen app');
});

//Static files
app.use(express.static('public'));
