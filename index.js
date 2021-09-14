const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

//app setup
const app = express();

//connect to MDB
mongoose.connect('mongodb://localhost/notif', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(cors())
app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));


//error handler

app.use(function(err, req, res, next){
    console.log(err);

    res.status(422).send({error: err.message});
});

let server = app.listen(process.env.port || 4000, function() {
	console.log('Listen app');
});

//Static files
app.use(express.static('public'));




