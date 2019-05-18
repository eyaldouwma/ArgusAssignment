const bodyParser = require('body-parser');
const express = require('express');
const vehicle = require('./api/routes/vehicle');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();

//connect to our MongoDB database
mongoose.connect('mongodb+srv://eyaldo1:Ee123456@vehicle-fleet-lmyrf.mongodb.net/test?retryWrites=true', {
  useFindAndModify: false,
  useNewUrlParser: true,
})

//Routing
app.use('/api/vehicle',vehicle);

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

//Static file declare
app.use(express.static(path.join(__dirname,'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname,'client/build')));

  app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname = 'client/build/index.html'));
  })
}

//build mode
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

module.exports = app;