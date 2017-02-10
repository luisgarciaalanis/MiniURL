'use strict';

/**
 * Configures the routes for the angular ui router
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param $locationProvider
 */
function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    /**
     * Map containing the application routes
     */
    var states = [
        { name: 'Create',   url: '/',         component: 'muCreate'   },
        { name: 'Created',  url: '/created',  component: 'muCreated'  },
        { name: 'About',    url: '/about',    component: 'muAbout'    },
        { name: 'NotFound', url: '/notfound', component: 'muNotFound' }
    ];

    /**
     * Registering the routes with the state provider so that the router can use them.
     */
    for (var index = 0 ; index < states.length ; index++) {
        $stateProvider.state(states[index]);
    }
}

configRoutes.$inject = [ '$stateProvider', '$urlRouterProvider', '$locationProvider' ];

/**
 * Export function to initialize the router
 *
 * @param app
 */
module.exports.Init = function(app) {
    app.config(configRoutes);
};
