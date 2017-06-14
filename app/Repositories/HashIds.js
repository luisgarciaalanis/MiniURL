'use strict';
const muDB = require('../database/muDB');
const hashIdsConstants = require('../../global/globals').hashIds;
const log = require('../libs/logger');

class HashIdsRepository {
    /**
     * Seed if empty
     *
     * @returns {*|Promise.<TResult>}
     * @constructor
     */
    async seedIfEmpty() {
        try {
            let count = await muDB.miniUrls.count();
            if (count === 0) {
                count = await muDB.hashIdInfo.count();
                if (count === 0) {
                    log.info('Seeding the database!');
                    return this.generateRandomIntIds();
                } else {
                    log.info('Seeding the database!');
                    return this.generateRandomIntIds();
                }
            }
        } catch (err) {
            log.error('Could not get hashIdInfo count!');
        }
    }

    /**
     * Insert the next batch of random hashIdInts into the database
     *
     * @param randomInts
     * @returns {Promise}
     */
    insertRandomIntIds(randomInts) {
        return new Promise((resolve) => {
            let insertedSoFar = 0;
            let resolved = false;
            const insertAtOnce = hashIdsConstants.insertAtOnce;

            log.info('insertRandomIntIds - About to insert newly generated ID\'s!');

            /**
             * We spawn an interval to insert the random id's in insertAtOnce chunks
             */
            let intervalId = setInterval(() => {
                let bulk = muDB.miniUrls.initializeUnorderedBulkOp();
                let insertUntil = (insertedSoFar + insertAtOnce) < hashIdsConstants.createAtOnce ? insertedSoFar + insertAtOnce : hashIdsConstants.createAtOnce;

                /**
                 * For performance gains by indexing URL with unique == true, we need to put unique values that are not
                 * URL so that we do find and updates based on strings begining with -. This change made a HUGE performance
                 * on the insertion of data. From seconds to less than 10 ms when dealing with millions of documents.
                 */
                for ( ; insertedSoFar < insertUntil ; insertedSoFar++) {
                    let alias = this.intToBase32(randomInts[insertedSoFar]);
                    bulk.insert({
                        alias: alias,
                        index: insertedSoFar,
                        URL: `-${alias}`
                    });
                }

                bulk.execute().then(
                    () => {
                        /**
                         *  once the first batch of ids becomes available we can resolve to avoid having to wait for one
                         *  million insets.
                         */
                        if (!resolved) {
                            resolved = true;
                            resolve();
                        }
                    },
                    (error) => {
                        /**
                         * initializeUnorderedBulkOp will not die if there is a insert on a key that already exists but
                         * will generate an error we can ignore. We ignore this because there might be a custom URL that
                         * is base32 compatible for example /LaLaLanD and we don't want to eventually generate an ID with
                         * another site.
                         * So due to this we call resolve() on error.
                         */
                        log.warn('generateRandomIntIds - Duplicate insert hit and ignored!');
                        log.warn(error);
                        resolve();
                    }
                );

                if (insertedSoFar == hashIdsConstants.createAtOnce) {
                    log.info('insertRandomIntIds - Finished inserting newly generated ID\'s!');
                    clearInterval(intervalId);
                    intervalId = null;
                    this.setNextIdToGenerate();
                }
            }, hashIdsConstants.msBetweenBulks);
        });
    }

    /**
     * Updates the number of the next value that needs to be generated on the database
     *
     * @returns {Promise.<TResult>}
     */
    async setNextIdToGenerate() {
        return muDB.hashIdInfo.findOneAndUpdate({ _id: 'nextIdToGenerate'}, { $inc: { 'nextIdToGenerate': hashIdsConstants.createAtOnce }}).then(
            () => {
                return true;
            }
        );
    }

    /**
     * Updates the number of the next value that needs to be generated on the database
     *
     * @returns {Promise.<TResult>}
     */
    async setNextIdToGenerate() {
        return muDB.hashIdInfo.findOneAndUpdate({ _id: 'nextIdToGenerate'}, { $inc: { 'nextIdToGenerate': hashIdsConstants.createAtOnce }}).then(
            () => {
                return true;
            }
        );
    }

    /**
     * Returns the next number that needs to be generated on the database. This is used for generating the batch of ids.
     *
     * @returns {Promise.<TResult>}
     */
    getNextIdToGenerate() {
        return muDB.hashIdInfo.findOne({ _id: 'nextIdToGenerate'}).then(
            (doc) => {
                return doc.nextIdToGenerate;
            }
        );
    }

    /**
     * Generate random Id's based on hashIds.createAtOnce constant, defaulted to one million, then scrambles them.
     *
     * @returns {Promise}
     */
    async generateRandomIntIds() {
        return this.getNextIdToGenerate().then(
            (nextIdToGenerate) => {
                let timeStart = Date.now();
                let randomInts = [];

                for (let index = 0 ; index < hashIdsConstants.createAtOnce; index++) {
                    randomInts.push(index + nextIdToGenerate);
                }

                for (let index = 0 ; index < hashIdsConstants.createAtOnce; index++) {
                    var ran = Math.floor(Math.random() * (hashIdsConstants.createAtOnce - index)) + index;
                    var temp = randomInts[index];
                    randomInts[index] = randomInts[ran];
                    randomInts[ran] = temp;
                }
                log.info(`'Time it took: to randomize array of ${ hashIdsConstants.createAtOnce } integers to be used as id's: ${(Date.now()-timeStart)/1000} seconds`);

                return this.insertRandomIntIds(randomInts)
        });
    }

    /**
     * Checks to see if the hash is of the right characters. Asumes hash has been validated for spaces and it has been
     * converted to lower case.
     *
     * @param hash
     * @returns {boolean}
     */
    isValidHash(hash) {
        let result = false;

        if (hashIdsConstants.regExp.test(hash)) {
            if (hash.length < 11) {
                result  = true;
            } else if (hash.length == 11) {
                /**
                 * SPECIAL CASE!
                 *
                 * maxHashValue is based on JavaScript MAX_SAFE_INTEGER constant that has a value of 9007199254740991
                 * we check that the string value of the hash variable <= of the maxHashValue variable.
                 */
                const maxHashValue = 'h9999999999';
                for (let index = 0 ; index < 11 ; index++) {
                    if (hashIdsConstants.base32Lookup.indexOf(hash[index]) <= hashIdsConstants.base32Lookup.indexOf(maxHashValue[index])) {
                        result = true;
                        break;
                    }

                }
                result  = true;
            }
        }

        return result;
    }

    /**
     * Converts an integer into a base32 string
     *
     * @param number
     * @param digits
     * @returns {*}
     */
    intToBase32(number) {
        let result = '';

        /**
         * Convert the number to base32
         */
        do {
            let reminder = number % 32;
            number = Math.floor(number / 32);
            result = hashIdsConstants.base32Lookup[reminder] + result;
        } while(number > 0);

        return result;
    }
}

module.exports = new HashIdsRepository();