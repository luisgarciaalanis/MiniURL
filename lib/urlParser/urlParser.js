'use strict';

let parser = require('./urlParserCommon').parse;

/**
 * Wraps the parser to catch exceptions and log to console
 *
 * @param url
 * @param logErrors
 * @returns {boolean}
 */
function urlParser(url, logErrors) {
    if (typeof logErrors === 'undefined') {
        logErrors = false;
    }

    let result = false;

    try {
        result = parser(url);
    }
    catch(e) {
        if (logErrors) {
            console.error(e);
        }
        result = false;
    }

    return result;
};

module.exports.parse = urlParser;