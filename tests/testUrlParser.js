let assert = require('assert');
let urlParser = require('../lib/urlParser/urlParser');

describe('Url parser tests', () => {
    /**
     * TESTING PASSING URLS
     */
    describe('Url parser tests SHOULD ALL PASS', () => {

        const passingURLs = [
            [ 'Standard URL', 'http://www.google.com' ],
            [ 'Standard URL with trailing slash', 'http://www.yahoo.com/' ],
            [ 'URL without .com', 'http://www.google' ],
            [ 'URL with port', 'https://www.google.com:8889' ],
            [ 'URL with no protocol', 'shlashdot.org' ],
            [ 'URL in capital letters', 'http://CAPITALIZED.COM' ],
            [ 'url that should resolve localy', 'shlashdot' ],
            [ 'Youtube video', 'https://www.youtube.com/watch?v=9lvbcOXhkbQ' ],
            [ 'Youtube video with no protocol', 'www.youtube.com/watch?v=9lvbcOXhkbQ' ],
            [ 'URL with login and password', 'http://alogin:aPassword@domainname.com' ],
            [ 'URL with login and password and trailing slash', 'http://alogin:aPassword@domainname.com/' ],
            [ 'Local server', 'http://localserver' ],
            [ 'URL with dashes', 'http://test-dashes-work.com' ],
            [ 'URL with lots of sub domains', 'wwwwwwwwwwwww.test.lots.of.sub.domains.com/' ],
            [ 'Protocol with capital letters', 'HtTp://testing-capitalized-protocol' ],
            [ 'URL with a path', 'www.test.single.path.com/Apath' ],
            [ 'URL with more than one path', 'www.test-multiple-paths.com/Apath/AnotherPath/TheLastPath' ],
            [ 'URL with path and port', 'http://test-url-with-path-and-port:2345/aPath' ],
            [ 'URL with path with dashes', 'http://test-url-with-path-and-dashes/aPath-with-dashes' ],
            [ 'URL with one param', 'http://testing.with.one.param?param1=test' ],
            [ 'URL with two params', 'http://testing.with.two.param?param1=test&param2=YES' ],
            [ 'URL with two params and a path', 'http://testing.with.two.param/one/two/switch?param1=test&param2=YES' ],
            [ 'Google images search', 'https://testing.google.images.search/search?q=guns+n+roses&source=lnms&tbm=isch&sa=X&ved=0ahUKEwj9-NiCm_XRAhVFz1QKHbNGAL4Q_AUICigD&biw=1280&bih=909#imgrc=wh37vCSpUeBN6M:' ],
            [ 'URL to image', 'http://image.test/2015/11/promoted-media-optimized_5658eff54962e.jpg' ],
            [ 'Wikipedia page with an apostrophe and a HASH search', 'https://en.wikipedia.org/wiki/Guns_N\'_Roses#International_success_and_band_turmoil_.281990.E2.80.931993.29' ],
            [ 'URL with encoded character %20', 'http://example.com/blue+light%20blue']
        ];

        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`TEST "${passingURLs[index][0]}" - ${passingURLs[index][1]}`, () => {
                assert.equal(urlParser.parse(passingURLs[index][1]), true);
            });
        }
    });

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
     * TESTING EMAILS
     */
    describe('Email tests should pass', () => {

        const passingURLs = [
            [ 'Mail to Axl Rose', 'mailto://axl@gnr.com'],
            [ 'Mail with dashes', 'mailto://axl@guns-roses.com'],
            [ 'Mail with dashes in login', 'mailto://axl-rose@guns-roses.com'],
            [ 'Mail with dot in login', 'mailto://slash.works@nowhere.com'],
            [ 'Mail with dot and slash in login', 'mailto://slash.works-for-sure@nowhere.com'],
            [ 'Local mail', 'mailto:axl@gnr'],
            [ 'Mail without slashes', 'mailto:slash@gnr.com'],
            [ 'Mail protocol on its own should be treated like a local domain', 'mailto'],
        ];

        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`TEST "${passingURLs[index][0]}" - ${passingURLs[index][1]}`, () => {
                assert.equal(urlParser.parse(passingURLs[index][1]), true);
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
