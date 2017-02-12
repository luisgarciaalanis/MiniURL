'use strict';
require('../lib/testUrl');
const t = require('./TestMiniURLFramework/t');
const homePage = require('./TestMiniURLFramework/HomePage');
const createdPage = require('./TestMiniURLFramework/CreatedPage');
const test = require('selenium-webdriver/testing');

const mochaTimeOut = 30000; //ms

let assert = require('assert');

describe('MiniURL creation without alias:', function() {
    this.timeout(mochaTimeOut);

    describe('Application works if url...', function() {
        test.beforeEach(function() {
            t(homePage.goTo(), 'Open MiniURL');
        });

        test.afterEach(function() {
            t(homePage.close(), 'Failed to close the browser.');
        });

        test.it('is simple http://www.google.com', () => {
            t(homePage.submitURL('http://www.google.com'), 'Failed to submit url for minification');
            t(createdPage.isAt(), 'Failed to land in the create page.');
        });

        test.it('is simple fandango.com without protocol', () => {
            t(homePage.submitURL('fandango.com'), 'Failed to submit url for minification');
            t(createdPage.isAt(), 'Failed to land in the create page.');
        });
    });
});

describe('MiniURL creation with alias:', function() {
    this.timeout(mochaTimeOut);

    describe('Application works...', function() {
        test.beforeEach(function() {
            t(homePage.goTo(), 'Open MiniURL');
        });

        test.afterEach(function() {
            t(homePage.close(), 'Failed to close the browser.');
        });

        test.it('with numbers as alias', () => {
            t(homePage.submitURLWithAlias('http://www.facebook.com', '123'), 'Failed to submit url with alias for minification');
            t(createdPage.isAt(), 'Failed to land in the create page.');
        });

        test.it('with big alias works.', () => {
            t(homePage.submitURLWithAlias('http://www.gunsnroses.com/', 'ab3456789zab3456789z'), 'Failed to submit url with alias for minification');
            t(createdPage.isAt(), 'Failed to land in the create page.');
        });

        test.it('with dashed alias', () => {
            t(homePage.submitURLWithAlias('http://www.yahoo.com', 'A-Dashed-alias'), 'Failed to submit url with alias for minification');
            t(createdPage.isAt(), 'Failed to land in the create page.');
        });
    });
});
