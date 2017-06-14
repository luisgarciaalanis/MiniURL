'use strict';
const muDB = require('../database/muDB');
const log = require('../libs/logger');
const HashIds = require('./HashIds');
const Boom = require('boom');
const HashIdsInfo = require('./HashIdsInfo');

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
                                if (!doc.URL.startsWith('-')) {
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
     * If we don't have it already, we try to insert it only if the alias is not taken. For miniUrls
     * the alias is a unique indexed field so it should fail if its already in use.
     *
     * @param stringUrl
     * @param alias
     * @returns {*|Promise.<TResult>}
     */
    async insertUrlWithAlias(stringUrl, alias) {
        try {
            await muDB.miniUrlsCustom.insertOne({ alias: alias,  URL: stringUrl });
            /**
             * If the alias is a hashId compatible id we need to block it from the miniUrls DB since its
             * now a custom one and we don't want that id to ever be used. So we updateOne with upsert: true
             */
            if (HashIds.isValidHash(alias)) {
                let doc = await muDB.miniUrls.updateOne({ alias: alias }, { $set: { URL: `+${alias}` }}, { upsert: true, returnNewDocument: true });

                return alias;
            } else {
                return alias;
            }

        } catch (err) {
            throw muDB.errorHandler(err);
        }
    }

    /**
     * Adds a url without an alias
     *
     * @param stringUrl
     * @returns {*}
     */
    async addUrl(stringUrl) {
        let doc = await muDB.miniUrls.findOne({ URL: stringUrl });

        if (doc) {
            return doc.alias;
        }

        let index = await HashIdsInfo.getNextIndex();

        doc = await muDB.miniUrls.findOne({ index: index });
        let customDoc = await muDB.miniUrlsCustom.findOne({ alias: doc.alias });

        /**
         * If we have a custom URL with that alias we get another one
         */
        if (customDoc) {
            index = await HashIdsInfo.getNextIndex();
        }

        doc = await muDB.miniUrls.findOneAndUpdate({ index: index }, {$set: { URL: stringUrl }});


        return doc.value.alias;
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