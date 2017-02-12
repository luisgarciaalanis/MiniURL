let assert = require('assert');
let urlParser = require('../../lib/urlParser/urlParser');

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
            [ 'URL with encoded character %20', 'http://example.com/blue+light%20blue'],
            [ 'Email', 'mailto:mickey@disney.com'],
            [ 'Email', 'mailto://donald@disney.com'],
        ];

        for (let index = 0 ; index < passingURLs.length; index++) {
            it(`TEST "${passingURLs[index][0]}" - ${passingURLs[index][1]}`, () => {
                assert.equal(urlParser.parse(passingURLs[index][1]), true);
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
});
