'use strict';

let parser = require('./urlParserCommon').parse;

module.exports.parse = (url, expectFailure) => {
    let result = false;

    if (expectFailure === undefined) {
        expectFailure = false;
    }

    try {
        result = parser(url);
    }
    catch(e) {
        if (!expectFailure) {
            console.error(e);
        }
        result = false;
    }

    return result;
};
