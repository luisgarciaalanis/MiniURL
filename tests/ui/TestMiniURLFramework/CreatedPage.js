'use strict';
const browser = require('./Browser');
const Selenium = require('selenium-webdriver');
const testURL = require('../../lib/testUrl');

class CreatedPage {
    constructor() {
        this.createAnotherButton = Selenium.By.name('CreateAnother');
        this.muCreatedTag = Selenium.By.tagName('mu-created');
    }

    goTo() {
        return browser.goTo(testURL + '/created');
    }

    clickCreateAnother() {
        return browser.webDriver.findElement(this.muCreatedTag).click();
    }

    isAt() {
        return browser.webDriver.wait(Selenium.until.elementLocated(this.muCreatedTag), 3000);
    }

    close() {
        return browser.close();
    }
}

module.exports = new CreatedPage();