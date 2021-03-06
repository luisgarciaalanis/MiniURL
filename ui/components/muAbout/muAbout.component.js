'use strict';

/**
 * Initializes the component
 *
 * @param app
 * @constructor
 */
module.exports.Init = function (app) {
    app.component('muAbout', {
        template: require('./muAbout.tpl.html'),
        transclude: true
    });
};