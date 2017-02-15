'use strict';

function muCreatedComponent(ShrinkUrlService, $state) {
    if(ShrinkUrlService.shrinkResult) {
        this.miniUrl = 'http://' + window.location.host + '/' + ShrinkUrlService.shrinkResult.alias;
        this.url = ShrinkUrlService.shrinkResult.url;
    } else {
        $state.go('Create');
    }
}

muCreatedComponent.$inject = [ 'ShrinkUrlService', '$state' ];

/**
 * Initializes the component
 *
 * @param app
 * @constructor
 */
module.exports.Init = function(app) {
    app.component('muCreated', {
        template: require('./muCreated.tpl.html'),
        controller: muCreatedComponent
    });
}