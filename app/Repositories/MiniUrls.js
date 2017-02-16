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
        return muDB.miniUrlsCustom.findOne({ alias: alias }).then(
            (doc) => {

                if (doc) {
                    /** If we have it already we don't return it because alias are unique and secret */
                    if (doc.URL == stringUrl) {
                        return alias;
                    } else {
                        throw Boom.conflict('Alias already taken, try another one.');
                    }
                }

                /** If did not find a custom one we first need to verify its not in use as a regular alias */
                if (HashIds.isValidHash(alias)) {
                    return muDB.miniUrls.findOne({alias: alias}).then(
                        (doc) => {
                            if (doc) {
                                /** If we find one and its in use we can't use the alias */
                                if (!doc.alias.startsWith('-')) {
                                    throw Boom.conflict('Alias already taken, try another one.');
                                }
                            }
                            /** Since its a regular alias and its either not found or not in use we can safetly insert
                             * it. */
                            return this.insertUrlWithAlias(stringUrl, alias);
                        }
                    );
                } else {
                    /** since it's not a regular alias we can safely insert it */
                    return this.insertUrlWithAlias(stringUrl, alias);
                }
            }
        );
    }

    /**
     * If we dont have it already, we try to insert it only if the alias is not taken. For miniUrls
     * the alias is a unique indexed field so it should fail if its already in use.
     *
     * @param stringUrl
     * @param alias
     * @returns {*|Promise.<TResult>}
     */
    insertUrlWithAlias(stringUrl, alias) {
        return muDB.miniUrlsCustom.insertOne({ alias: alias,  URL: stringUrl }).then(
            (doc) => {
                /**
                 * If the alias is a hashId compatible id we need to block it from the miniUrls DB since its
                 * now a custom one and we don't want that id to ever be used. So we updateOne with upsert: true
                 */
                if (HashIds.isValidHash(alias)) {
                    muDB.miniUrls.updateOne({ URL: { $regex: /^-/ }}, { $set: { URL: `+${alias}` }}, { upsert: true, returnNewDocument:true }).then(
                        (doc) => {
                            return alias;
                        }
                    );
                } else {
                    return alias;
                }
            },
            (error) => {
                throw muDB.errorHandler(error);
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
        /** 1) We first look in Custom store */
        return muDB.miniUrlsCustom.findOne({ alias: alias }).then((doc) => {
            if (!doc) {
                /** 2) if we don't find it and its a valid hash we look in the miniUrls store otherwise we throw notFound() */
                if (HashIds.isValidHash(alias)) {
                    return muDB.miniUrls.findOne({ alias: alias }).then(
                        (doc) => {
                            if (doc) {
                                if (doc.alias[0] != '+' && doc.alias[0] != '-') {
                                    return doc.URL;
                                }
                            }
                            throw Boom.notFound();
                        }
                    );
                }
                throw Boom.notFound();
            } else {
                return doc.URL;
            }
        });
    }
}

module.exports = new MiniUrls();