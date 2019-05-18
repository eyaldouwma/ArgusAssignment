const winston = require('winston');
const config = require('./config');

const logger = winston.createLogger(config);

module.exports = logger;