'use strict';
require('../lib/testUrl');
const assert = require('assert');
const ApiHelpres = require('./framework/ApiHelpers');

describe('MiniURL creation with alias:', function() {
    /**
     * Pool of functional URL's to test
     */
    const passingURLs = [
        [ 'api', 'http://www.google.com' ],
        [ 'css', 'http://www.google.com' ],
        [ 'js', 'http://www.google.com' ],
        [ 'created', 'http://www.google.com' ],
        [ 'about', 'http://www.google.com' ],
        [ 'notfound', 'http://www.google.com' ],
        [ 'favicon.ico', 'http://www.google.com' ],
    ];

    describe(`Api blocks aliases that are reserved..`, function() {
        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`${passingURLs[index][0]} for ${passingURLs[index][1]}`, () => {
                return ApiHelpres.TestFailWithAlias(passingURLs[index][1], passingURLs[index][0], 409);
            });
        }
    });

    describe('API should block URLS with...', function() {
        /**
         * Pool of bad URL's to test
         */
        const failingURLs = [
            [ 'javascript as URL', 'javascript:alert("Hello");' ],
        ];

        for (let index = 0 ; index < failingURLs.length; index++) {
            it(`${failingURLs[index][0]} - ${failingURLs[index][1]}`, () => {
                return ApiHelpres.TestFailWithNoAlias(failingURLs[index][1], 403);
            });
        }
    });
});

