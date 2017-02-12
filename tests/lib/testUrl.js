'use strict';
let testURL = process.env.MINIURL_TEST_URL;

if (typeof testURL === 'undefined') throw 'MINIURL_TEST_URL enviroment variable needs to be defined.'

console.log(`Test server: ${testURL}`);

module.exports = testURL;