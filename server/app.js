const bodyParser = require('body-parser');
const express = require('express');
const vehicle = require('./api/routes/vehicle');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

//connect to our MongoDB database
mongoose.connect('mongodb+srv://eyaldo1:Ee123456@vehicle-fleet-lmyrf.mongodb.net/test?retryWrites=true', {
  useFindAndModify: false,
  useNewUrlParser: true,
})


//its ok for other domains to contact us, since we are a rest api
//and we provide data services to others
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Methods', "*");
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }

app.use(allowCrossDomain);

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//Routing
app.use('/api/vehicle',vehicle);

module.exports = app;