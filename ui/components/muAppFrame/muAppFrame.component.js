'use strict';

/**
 * Initializes the component
 *
 * @param app
 * @constructor
 */
module.exports.Init = function(app) {
    app.component('muAppFrame', {
        template: require('./muAppFrame.tpl.html'),
        transclude: true,
        controller: function() {}
    });
}