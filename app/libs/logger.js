const snl = require('simple-node-logger');

const log = (typeof process.env.MINIURL_DB_CONNECTION_STRING === 'undefined') ? snl.createSimpleLogger() : snl.createSimpleLogger(`/var/log/miniurl/logs-${Date.now()}.log`);

module.exports = log;
