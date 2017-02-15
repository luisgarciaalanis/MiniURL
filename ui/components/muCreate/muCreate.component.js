'use strict';
var urlParser = require('../../../lib/urlParser/urlParser');
var defaults = require('../../../global/globals');

/**
 * Handles the MiniURL create page
 *
 * @param ShrinkUrlService
 * @param $state
 */
function muCreateComponent(ShrinkUrlService, $state) {

    this.url = '';
    this.customAlias = '';
    this.alert = null;
    this.host = window.location.host;
    this.urlMaxSize = defaults.urlMaxSize;
    this.aliasMaxSize = defaults.customAlias.maxSize;
    ShrinkUrlService.clear();

    /**
     * Verifies if a URL is valid
     *
     * @returns {boolean}
     */
    this.verifyUrlIsValid = function () {
        var result = false;
        this.url = this.url.trim();
        if (urlParser.parse(this.url)) {
            var urlLower = this.url.toLowerCase();
            if (!urlLower.startsWith('http://') && !urlLower.startsWith('https://') && !urlLower.startsWith('mailto:')) {
                this.url = 'http://' + this.url;
            }

            if (this.url.length < defaults.urlMaxSize) {
                result = true;
            } else {
                this.alert = {
                    type: 'danger',
                    msg: 'URL is too long, make sure the URL is less than ' + defaults.urlMaxSize +
                         ' charactes long, including http(s)://'
                };
            }
        } else {
            this.alert = { type: 'danger', msg: 'Invalid URL!' };
        }

        return result;
    };

    /**
     * Verifies if the custom alias is valid
     * @returns {boolean}
     */
    this.verifyCustomAliastIsValid = function() {
        var result = false;
        this.customAlias = this.customAlias.trim();

        if (this.customAlias.length == 0) {
            result = true;
        } else if ((this.customAlias.indexOf(' ') < 0) && defaults.customAlias.regExp.test(this.customAlias)) {
            if (this.customAlias[0] != '-' && this.customAlias[this.customAlias.length -1] != '-') {
                result = true
            }
        }

        if (!result) {
            this.alert = { type: 'danger', msg: 'Invalid alias! Make sure the alias does not conain spaces or has any dashes (-) at the beginning or end.' };
        }

        return result;
    };

    /**
     * Submits a URL to be shrinked
     */
    this.submitUrl = function() {
        if (this.verifyUrlIsValid() && this.verifyCustomAliastIsValid()) {
            ShrinkUrlService.shrink(this.url, this.customAlias).then(
                function () {
                    $state.go('Created');
                },
                function (error) {
                    switch (error.status) {
                        case 500:
                            this.alert = { type: 'danger', msg: 'Failed to shrink the URL.'};
                            break;
                        case 403:
                            this.alert = { type: 'danger', msg: error.data.message };
                        case 409:
                            this.alert = { type: 'danger', msg: error.data.message };
                            break;
                        case 503:
                            this.alert = { type: 'danger', msg: 'MiniUrl service is not available. Try again at a later time.' };
                            break;
                        default:
                            this.alert = { type: 'danger', msg: 'Unexpected Error' };
                    }
                }.bind(this)
            );
        }
    };

    /**
     * Closes an alert being displayed
     */
    this.closeAlert = function () {
        this.alert = null;
    };
}

muCreateComponent.$inject = [ 'ShrinkUrlService', '$state' ];

/**
 * Initializes the component
 *
 * @param app
 * @constructor
 */
module.exports.Init = function(app) {
    app.component('muCreate', {
        template: require('./muCreate.tpl.html'),
        controller: muCreateComponent
    });
}