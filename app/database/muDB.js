'use strict';
const dbConfig = require('./config');
const log = require('../libs/logger');
const MongoClient = require('mongodb');
const Boom = require('boom');

function muDB() {
    let reject = null;
    let resolve = null;
    let db = null;
    let readyPromise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });

    this.errorHandler = function(error) {
        switch (error.code) {
            case 11000:
                return Boom.conflict('Alias already taken, try another one.');
            break;
            case undefined:
                return Boom.internal('Internal server error, data not accessible!');
            default:
                return Boom.internal(`Unexpected error with code: ${error.code}`)
        };
    }

    this.ready = () => {
        return readyPromise;
    };

    this.isConnected = false;

    MongoClient.connect(dbConfig.connectionString, (err, database) => {
        if (err) {
            reject(err);
            log.error(err);
            this.isConnected = false;
            return;
        }

        db = database.db(dbConfig.name);
        this.miniUrls = db.collection(dbConfig.miniUrlsCollectionName);
        this.miniUrls.createIndex({ hash: 1 }, { unique: true })
        this.miniUrlsCustom = db.collection(dbConfig.miniUrlsCustomCollectionName);
        this.miniUrlsCustom.createIndex({ alias: 1 }, { unique: true })
        this.hashIdInfo = db.collection(dbConfig.hashIdInfoCollectionName);
        this.hashIdInfo.insertOne({_id: 'nextIdToGenerate', nextIdToGenerate: 0 }).catch(() => {});

        db.on('error', (error) => {
            this.isConnected = false;
            log.error(error);
        });

        resolve();
    });
}

module.exports = new muDB();