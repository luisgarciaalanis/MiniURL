let assert = require('assert');
let urlParser = require('../../lib/urlParser/urlParser');

describe('Url parser tests', () => {
    /**
     * TESTING FAILING URLS
     */
    describe('Url parser tests SHOULD FAIL', () => {

        const passingURLs = [
            [ 'URL with just protocol', 'HtTp://' ],
            [ 'Standard URL bad protocol', 'htp://www.google.com' ],
            [ 'Standard URL with space', 'http://www.yaho o.com/' ],
            [ 'Standard URL without forward slashes', 'http:www.google' ],
            [ 'URL with port to big', 'https://www.google.com:888933' ],
            [ 'Youtube video with space on the param', 'https://www.youtube.com/watch?v=9lvbcOX hkbQ' ],
            [ 'URL with login but no password and trailing :', 'http://alogin:@domainname.com' ],
            [ 'URL with login but no password', 'http://alogin@domainname.com' ],
            [ 'URL with spaces between the dots', 'wwwwwwwwwwwww . test . com/' ],
            [ 'URL with double dots', 'HtTp://testing..com' ],
            [ 'URL with end dot', 'HtTp://testing.' ],
            [ 'URL with end dots', 'HtTp://testing..' ],
            [ 'URL with prefix dot', 'HtTp://.testing' ],
            [ 'URL with space after domain', 'www.test.single.path.com /Apath' ],
            [ 'URL with space after first slash', 'www.test.single.path.com/ Apath' ],
            [ 'URL with space in path', 'www.test-multiple-paths.com/Apa th/AnotherPath/TheLastPath' ],
            [ 'URL with space in second path', 'www.test-multiple-paths.com/Apa th/Another Path/TheLastPath' ],
            [ 'URL with path no port but :', 'http://test-url-with-path-and-port:' ],
            [ 'URL with path no port but : and a /', 'http://test-url-with-path-and-port:/' ],
            [ 'URL with path with dashs at the begining', 'http://-test-url-with-path-and-dashes.com' ],
            [ 'URL with path with dashs at the end', 'http://test-url-with-path-and-dashes-.com' ],
            [ 'URL with one param and a space', 'http://testing.with.one.param?par am1=test' ],
            [ 'URL with empty param (should this work?)', 'http://testing.with.two.param?param1=test&param2' ],
            [ 'URL with encoded character %FF (NOTE: I have not coded all the supported encoded chars)', 'http://example.com/blue+light%FFblue'],
            [ 'URL internatinalization is not supported by the parser', 'http://xn--nw2a.xn--j6w193g/'],
        ];

        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`TEST "${passingURLs[index][0]}" - ${passingURLs[index][1]}`, () => {
                assert.equal(urlParser.parse(passingURLs[index][1], true), false);
            });
        }
    });

    /**
     * TESTING FAILING EMAILS
     */
    describe('Email tests should fail', () => {

        const passingURLs = [
            [ 'Mail to domain', 'mailto://gnr.com'],
            [ 'Mail to nobody in domain', 'mailto://@gnr.com'],
            [ 'Mail to nobody in domain', 'mailto:@gnr.com'],
            [ 'Mail protocol', 'mailto://'],
            [ 'Mail protocol 2', 'mailto:'],
            [ 'Mail double @', 'mailto://axl@axl@gnr.com'],
        ];

        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`TEST "${passingURLs[index][0]}" - ${passingURLs[index][1]}`, () => {
                assert.equal(urlParser.parse(passingURLs[index][1], true), false);
            });
        }
    });
});
