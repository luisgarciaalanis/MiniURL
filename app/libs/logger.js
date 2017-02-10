const snl = require('simple-node-logger');

const log = (typeof process.env.MINIURL_DB_CONNECTION_STRING === 'undefined') ? snl.createSimpleLogger() : snl.createSimpleLogger(`./logs/logs-${Date.now()}.log`);

module.exports = log;
