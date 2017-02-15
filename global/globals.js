'use strict';

/**
 * Based on the RFC 4648 base32 alphabet for hashIds.base32Lookup
 * https://en.wikipedia.org/wiki/Base32
 *
 * But I removed the l and added the 9 for more human readability
 */

var config = {
    hashIds: {
        createAtOnce: 10000,
        regExp: /^[a-km-z2-79]+$/,
        base32Lookup: 'abcdefghijkmnopqrstuvwxyz2345679'
    },
    customAlias: {
        maxSize: 20,
        regExp: /^[a-zA-Z0-9]+[a-zA-Z0-9\-]*[a-zA-Z0-9]+$/
    },
    urlMaxSize: 2000
};

module.exports = config;