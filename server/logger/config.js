const winston = require('winston');

const configuration = {
    'transports': [
        new winston.transports.Console()
    ]
};

module.exports = configuration;