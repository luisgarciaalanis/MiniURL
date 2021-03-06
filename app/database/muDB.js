'use strict';
const dbConfig = require('./config');
const log = require('../libs/logger');
const MongoClient = require('mongodb');
const Boom = require('boom');

/**
 * If this privates Symbol() is added to the this pointer of the instance then it wont be visible outside this module.
 */
let privates = Symbol();

/**
 * Handles the database connection
 */
class MuDB {
    /**
     * Creates the private members and initializes the connection
     */
    constructor() {
        /**
         * This is done to hide these members from the outer modules.
         */
        this[privates] = {
            reject: null,
            resolve: null,
            db: null,
            readyPromise: null
        };

        this[privates].readyPromise = new Promise((res, rej) => {
            this[privates].resolve = res;
            this[privates].reject = rej;
        });

        this.conncet();
    }

    /**
     * Converts some Mongo errors to Boom
     *
     * @param error
     */
    errorHandler(error) {
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

    /**
     * returns the promise to use to verify the database connection is ready
     *
     * @returns {null|Promise}
     */
    ready() {
        return this[privates].readyPromise;
    }

    /**
     * Disconnects the database
     */
    disconnect() {
        this[privates].db.close();
    }

    /**
     * Connects to the database
     */
    conncet() {
        MongoClient.connect(dbConfig.connectionString, (err, database) => {
            if (err) {
                this[privates].reject(err);
                log.error(err);
                return;
            }

            this[privates].db = database.db(dbConfig.name);

            /**
             * Creates or opens the collections needed
             */
            this.miniUrls = this[privates].db.collection(dbConfig.miniUrlsCollectionName);
            this.miniUrls.createIndex({ index: 1 }, { unique: true });
            this.miniUrls.createIndex({ alias: 1 }, { unique: true });
            this.miniUrls.createIndex({ URL: 1 }, { unique: true });
            this.miniUrlsCustom = this[privates].db.collection(dbConfig.miniUrlsCustomCollectionName);
            this.miniUrlsCustom.createIndex({ alias: 1 }, { unique: true })
            this[privates].db.collection(dbConfig.hashIdInfoCollectionName, {}, (err, col) => {
                /** The following line will fail if nextIdToGenerate exists */
                col.insertOne({ _id: 'nextIdToGenerate', nextIdToGenerate: 0, currentIndex: -1 }).then(
                    () => {
                        /**
                         * Resolves the promise.
                         */
                        this[privates].resolve();
                    }
                ).catch(() => {
                    /**
                     * Resolves the promise.
                     */
                    this[privates].resolve();
                });
                this.hashIdInfo = col;
            });

            /**
             * Just an event to log incase of an error
             */
            this[privates].db.on('error', (error) => {
                log.error(error);
            });

        });
    }
}

module.exports = new MuDB();