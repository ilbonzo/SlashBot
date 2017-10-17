if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

var config = require ('../config.json');
const telegram = require ('./telegram');

config = config[process.env.NODE_ENV];

telegram.init(config);
