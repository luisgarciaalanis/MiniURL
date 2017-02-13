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
            return this.addUrlForCustomHash(stringUrl, alias);
        }

        /** If if not we insert ir into the custom url collection */
        return muDB.miniUrlsCustom.findOne({ alias: alias }).then(
            (doc) => {

                if (doc) {
                    /** If we have it already we don't return it because alias are unique and secret */
                    if (doc.URL == stringUrl) {
                        return hashId;
                    } else {
                        throw Boom.conflict('Alias already taken, try another one.');
                    }
                }

                /**
                 * If we dont have it already, we try to insert it only if the alias is not taken. For miniUrls
                 * the alias is a unique indexed field so it should fail if its already in use.
                 */
                return muDB.miniUrlsCustom.insertOne({ alias: alias,  URL: stringUrl }).then(
                    (doc) => alias,
                    (error) => {
                        throw muDB.errorHandler(error);
                    }
                );
            }
        );
    }

    addUrlForCustomHash(stringUrl, hashId) {
        return muDB.miniUrls.findOne({ alias: hashId }).then(
            (doc) => {
                /**
                 * If we have it already and identical we return it
                 */
                if (doc) {
                    if (doc.URL == stringUrl) {
                        return hashId;
                    } else {
                        throw Boom.conflict('Alias already taken, try another one.');
                    }
                }
                /**
                 * If we dont have it already, we try to insert it only if the alias is not taken. The insert will fail
                 * if the ID is taken.
                 */
                return muDB.miniUrls.insertOne({ alias: hashId, URL:stringUrl }).then(
                    (doc) =>  hashId,
                    (error) => {
                        throw muDB.errorHandler(error);
                    }
                );
            }
        );
    }

    addUrlForHash(stringUrl, hashId) {
        return muDB.miniUrls.findOne({ alias: hashId, URL:stringUrl }).then(
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
                return muDB.miniUrls.insertOne({ alias: hashId, URL:stringUrl }).then(
                    (doc) =>  hashId,
                    (error) => {
                        throw muDB.errorHandler(error);
                    }
                );
            }
        );
    }

    /**
     * Adds a url without an alias
     *
     * @param stringUrl
     * @returns {*}
     */
    addUrl(stringUrl) {
        /** First we try to find it */
        return muDB.miniUrls.findOne({ URL: stringUrl }).then(
            (doc) => {
                /** if we do we return the alias, since we already have it on the DB */
                if (doc) {
                    return doc.alias;
                }

                /** This atomic operation should avoid possible race conditions */
                return muDB.miniUrls.findOneAndUpdate({ URL: { $regex: /^-/ }}, {$set: { URL: stringUrl }}).then(
                    (doc) => {
                        /** if we did not find any we need to generate more hashIds and then insert again. */
                        if (!doc.value) {
                            return HashIds.generateRandomIntIds().then(
                                () => {
                                    return muDB.miniUrls.findOneAndUpdate({ URL: { $regex: /^-/ }}, {$set: { URL: stringUrl }}).then(
                                        (doc) => {
                                            return doc.value.alias;
                                        }
                                    );
                                }
                            );
                        }

                        return doc.value.alias;
                    },
                    (error) => {
                        throw muDB.errorHandler(error);
                    }
                );
            }
        ).catch(
            (error) => {
                throw muDB.errorHandler(error);
            }
        );;
    }

    /**
     * Finds a URL for a given alias
     *
     * @param alias
     * @returns {*|Promise.<TResult>}
     */
    getUrl(alias) {
        /** If its a valid hash look on the miniUrls collection */
        if (HashIds.isValidHash(alias)) {
            return muDB.miniUrls.findOne({ alias: alias }).then(doc => doc.URL);
        }

        return muDB.miniUrlsCustom.findOne({ alias: alias }).then(doc => doc.URL);
    }
}

module.exports = new MiniUrls();