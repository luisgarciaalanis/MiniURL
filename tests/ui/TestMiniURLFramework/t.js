'use strict';
let assert = require('assert');

function t(promise, message) {
    promise.then(null, () => {
        assert(false, message);
    });
}

module.exports = t;