'use strict';
const muDB = require('../database/muDB');
const log = require('../libs/logger');
const HashIds = require('./HashIds');
const Boom = require('boom');

class MiniUrls {
    /**
     * Adds a custom aliased URL
     *
     * @param stringUrl
     * @param alias
     * @returns {*|Promise.<TResult>}
     */
    addUrlWithAlias(stringUrl, alias) {
        /** If the custom alias is a valid hash ID we insert it into the hash Id collection */
        if (HashIds.isValidHash(alias)) {
            return this.addUrlForHash(stringUrl, alias);
        }

        /** If if not we insert ir into the custom url collection */
        return muDB.miniUrlsCustom.findOne({ alias: alias, URL:stringUrl }).then(
            (doc) => {
                /** If we have it already we return it */
                if (doc) {
                    return doc.alias;
                }

                /**
                 * If we dont have it already, we try to insert it only if the alias is not taken. For miniUrlsCustom
                 * the alias is a unique indexed field so it should fail if its already in use.
                 */
                return muDB.miniUrlsCustom.insertOne({ alias: alias,  URL: stringUrl }).then((doc) => alias);
            }
        );
    }

    addUrlForHash(stringUrl, hashId) {
        return muDB.miniUrls.findOne({ hash: hashId, URL:stringUrl }).then(
            (doc) => {
                /**
                 * If we have it already and identical we return it
                 */
                if (doc) {
                    return hashId;
                }

                /**
                 * If we dont have it already, we try to insert it only if the alias is not taken. The insert will fail
                 * if the ID is taken.
                 */
                return muDB.miniUrls.insertOne({ hash: hashId, URL:stringUrl }).then(
                    (doc) =>  hashId,
                    (error) => {
                        throw muDB.errorHandler(error);
                    }
                );
            }
        );
    }

    addUrl(stringUrl) {
        return muDB.miniUrls.findOne({ URL: stringUrl }).then(
            (doc) => {
                if (doc) {
                    return doc.alias;
                }

                return HashIds.getNextAvailableHash().then(
                    (doc) => {
                        return muDB.miniUrls.findOneAndUpdate({ alias: doc.alias }, {$set: { URL: stringUrl }}).then(
                            () => {
                                return doc.alias;
                            },
                            (error) => {
                                throw muDB.errorHandler(error);
                            }
                        );
                    }
                );
            }
        ).catch(
            (error) => {
                throw muDB.errorHandler(error);
            }
        );;
    }

    getUrl(hash) {
        /** If its a valid hash look on the miniUrls collection */
        if (HashIds.isValidHash(hash)) {
            return muDB.miniUrls.findOne({ alias: hash }).then((doc) => doc.URL);
        }

        return muDB.miniUrlsCustom.findOne({ alias: hash }).then((doc) => doc.URL);;
    }
}

module.exports = new MiniUrls();