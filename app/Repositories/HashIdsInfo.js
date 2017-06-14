'user strict';
const muDB = require('../database/muDB');
const hashIdsConstants = require('../../global/globals').hashIds;
const HashIds = require('./HashIds');

/**
 * If this privates Symbol() is added to the this pointer of the instance then it wont be visible outside this module.
 */
let privates = Symbol();

class HashIdsInfo {
    constructor() {
        /**
         * This is done to hide these members from the outer modules.
         */
        this[privates] = {
            reject: null,
            resolve: null,
            readyPromise: null
        };

        this[privates].readyPromise = new Promise((res, rej) => {
            this[privates].resolve = res;
            this[privates].reject = rej;
        });

        this.nextIdToGenerate = 0;
        this.currentIndex = -1;

    }

    /**
     * returns the promise to use to verify the database connection is ready
     *
     * @returns {null|Promise}
     */
    ready() {
        this.init();
        return this[privates].readyPromise;
    }

    /**
     * Gets the next index of available hashIds
     *
     * @returns {number|*}
     */
    async getNextIndex() {
        this.currentIndex++;

        if (this.currentIndex == this.nextIdToGenerate) {
            console.log(HashIds.generateRandomIntIds);
            await HashIds.generateRandomIntIds();
        }

        muDB.hashIdInfo.findOneAndUpdate({ _id: 'nextIdToGenerate'}, { index: this.currentIndex });

        return this.currentIndex;
    }

    async init() {
        let doc = await muDB.hashIdInfo.findOne({ _id: 'nextIdToGenerate'});
        this.nextIdToGenerate = doc.nextIdToGenerate;
        this.currentIndex = doc.currentIndex;
        this[privates].resolve();
    }
}

module.exports = new HashIdsInfo();