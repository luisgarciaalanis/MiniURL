'use strict';
require('../lib/testUrl');
const chakram = require('chakram');
const ApiHelpres = require('./framework/ApiHelpers');

describe('MiniURL creation without alias:', function() {

    describe('API should block URLS with...', function() {
        /**
         * Pool of bad URL's to test
         */
        const failingURLs = [
            [ 'bad protocol', 'htpp://www.google.com' ],
            [ 'space in protocol', 'ht tp://www.google.com' ],
            [ 'no : in protocol', 'http//www.google.com' ],
            [ 'space in domain', 'http://www.ya hoo.com/' ],
            [ 'space in domain2', 'http://doma in' ],
            [ 'space before forward slash', 'http://domain /' ],
            [ '_ in domain', 'http://www.ya_hoo.com/' ],
            [ 'space before after slash', 'http://domain/ a' ],
            [ 'space in path', 'http://domain/this is bad/whatever' ],
            [ 'URL with login and NO password', 'http://loginNoPassword@domainname.com' ],
            [ 'URL with no login and no password', 'http://@domainname.com' ],
            [ 'Params with space 1', 'https://www.google.com/search ?q=malformed+URL+list' ],
            [ 'Params with space 2', 'https://www.google.com/search? q=malformed+URL+list' ],
            [ 'Params with space 3', 'https://www.google.com/search?q =malformed+URL+list' ],
            [ 'Params with space 4', 'https://www.google.com/search?q= malformed+URL+list' ],
            [ 'Params with space 5', 'https://www.google.com/search?q=malfo rmed+URL+list' ],
            [ 'Params with space 6', 'https://www.google.com/search?q=malformed +URL+list' ],
            [ 'Params with space 7', 'https://www.google.com/search?q=malformed+ URL+list' ],
            [ 'Space before #', 'https://en.wikipedia.org/wiki/Uniform_Resource_Locator #Syntax' ],
            [ 'Space after # 1', 'https://en.wikipedia.org/wiki/Uniform_Resource_Locator# Syntax' ],
            [ 'Space after # 2', 'https://en.wikipedia.org/wiki/Uniform_Resource_Locator# Syn tax' ],
            [ 'TEST123', 'https://redacted/SomePage.aspx?ACCESS_ERRORCODE=a%27;alert(9)//' ],
        ];

        for (let index = 0 ; index < failingURLs.length; index++) {
            it(`${failingURLs[index][0]} - ${failingURLs[index][1]}`, () => {
                return ApiHelpres.TestFailWithNoAlias(failingURLs[index][1]);
            });
        }
    });

    describe('API should block malformed aliases like...', function() {
        /**
         * Pool of maldormed aliases to test
         */
        const failingURLs = [
            [ 'preceding -', '-alias', 'htpp://whatever.com' ],
            [ 'trailing -', 'alias-', 'htpp://whatever2.com' ],
            [ 'only -', '-', 'htpp://whatever2.com' ],
            [ 'space in alias 1', 'ali as', 'htpp://whatever2.com' ],
            [ 'space in alias 1', 'ali -as', 'htpp://whatever2.com' ],
            [ 'space in alias 1', 'ali- as', 'htpp://whatever2.com' ],
            [ 'invalid chars _', 'ali_as', 'htpp://whatever2.com' ],
            [ 'invalid chars &', 'ali&as', 'htpp://whatever2.com' ],
        ];

        for (let index = 0 ; index < failingURLs.length; index++) {
            it(`${failingURLs[index][0]} ==> ${failingURLs[index][1]}`, () => {
                return ApiHelpres.TestFailWithAlias(failingURLs[index][2], failingURLs[index][1]);
            });
        }
    });
});


