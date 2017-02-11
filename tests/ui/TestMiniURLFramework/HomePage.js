'use strict';
const browser = require('./Browser');
const Selenium = require('selenium-webdriver');
const testURL = process.env.MINIURL_TEST_URL;

class HomePage {
    constructor() {
        this.url = Selenium.By.id('urlString');
        this.alias = Selenium.By.id('customAlias');
        this.makeMiniButton = Selenium.By.name('MakeMiniURL');
        this.home = Selenium.By.tagName('mu-create');
    }

    goTo() {
        return browser.goTo(testURL).then(
            () => {
                return this.isAt();
            });
    }

    isMiniURLButtonEnabled() {
        return browser.webDriver.findElement(this.makeMiniButton).isEnabled();
    }

    submitURL(url) {
        return this.isAt().then(
            (result) => {
                if (!result) {
                    throw 'Not in the create page!';
                }

                return this.typeUrl(url).then(
                    () => {
                        return this.clickMakeMiniURL();
                    }
                )
            }
        );
    }

    submitURLWithAlias(url, alias) {
        return this.isAt().then(
            (result) => {
                if (!result) {
                    throw 'Not in the create page!';
                }

                return this.typeUrl(url).then(
                    () => {
                        return this.typeAlias(alias).then(
                            () => {
                                return this.clickMakeMiniURL();
                            }
                        );
                    }
                )
            }
        );
    }

    typeUrl(url) {
        return browser.webDriver.findElement(this.url).sendKeys(url);
    }

    typeAlias(alias) {
        return browser.webDriver.findElement(this.alias).sendKeys(alias);
    }

    clickMakeMiniURL() {
        return browser.webDriver.findElement(this.makeMiniButton).click();
    }

    isAt() {
        return browser.webDriver.wait(Selenium.until.elementLocated(this.home), 3000);
    }

    close() {
        return browser.close();
    }
}

module.exports = new HomePage();