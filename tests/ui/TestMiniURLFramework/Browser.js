'use strict';
const chromedriver = require('chromedriver');
const Webdriver = require('selenium-webdriver');

class Browser {
    constructor() {
        this.webDriver = new Webdriver.Builder().withCapabilities(Webdriver.Capabilities.chrome()).build();
        this.firstTab = 0;
        this.secondTab = 1;
    }

    maximize() {
        return this.webDriver.manage().window().maximize();
    }

    unMaximize() {
        return this.webDriver.manage().window().setSize(1200, 800);
    }

    setMobileSize() {
        return this.webDriver.manage().window().setSize(400, 1200);
    }

    getTitle() {
        return this.webDriver.getTitle();
    }

    goTo(url) {
        if (!this.webDriver) {
            this.webDriver = new Webdriver.Builder().withCapabilities(Webdriver.Capabilities.chrome()).build();
        }
        return this.webDriver.get(url);
    }

    tabCount() {
        return this.webDriver.getAllWindowHandles().then((handles) => {
            return handles.length;
        });
    }

    switchTab(tab) {
        return this.webDriver.getAllWindowHandles().then((handles) => {
            console.log('switching tabs');
            console.log(handles);
            console.log('switching tabs');

            return this.webDriver.switchTo().window(handles[tab]);
        });
    };

    close() {
        let webDriver = this.webDriver;
        this.webDriver = null;
        return webDriver.close();
    }
}

module.exports = new Browser();