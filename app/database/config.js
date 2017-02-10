'use strict';

let config = {
    name: process.env.MINIURL_DB_NAME || 'MiniUrlTest',
    connectionString: process.env.MINIURL_DB_CONNECTION_STRING || 'mongodb://localhost:27017',
    miniUrlsCollectionName: 'MiniUrls',
    miniUrlsCustomCollectionName: 'MiniUrlsCustom',
    hashIdInfoCollectionName: 'hashIdInfo'
};

module.exports = config;