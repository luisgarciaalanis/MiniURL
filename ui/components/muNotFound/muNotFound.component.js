'use strict';

/**
 * Initializes the component fot he not found page
 *
 * @param app
 * @constructor
 */
module.exports.Init = function (app) {
    app.component('muNotFound', {
        template: require('./muNotFound.tpl.html'),
        transclude: true
    });
};