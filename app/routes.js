'use strict';
const ApplicationController = require('./controllers/ApplicationController');
const ShrinkUrlController = require('./controllers/ShrinkUrlController');

class Routes {
    /**
     * Initializes all the routes for the hapi server
     *
     * @param server
     */
    static Init(server) {
        Routes.server = server;
        Routes.InitDirectories();
        Routes.InitApiRoutes();
        Routes.InitStaticRoutes();
        Routes.InitRoutes();
    };

    /**
     * Initializes the directories to be freely served. These directories might contain files like photos or css...
     */
    static InitDirectories() {
        var routes = [];
        routes.push(Routes.getDirectoryRouteConfig('/css/{path*}',      './public/css'));
        routes.push(Routes.getDirectoryRouteConfig('/js/{path*}',       './public/js'));

        Routes.server.route(routes);
    }

    static InitApiRoutes() {
        let prefix = '/api/v1';

        let routes = [
            /** Auth routes **/
            { method: 'POST', path: `${prefix}/shrink`, handler: ShrinkUrlController.Shrink }
        ];

        this.server.route(routes);
    }

    /**
     * Initializes routes
     */
    static InitRoutes() {
        var routes = [
            /** Application routes **/
            { method: 'GET',  path: '/{hash}',   handler: ApplicationController.redirect },
        ];

        this.server.route(routes);
    }

    /**
     * Initializes routes to be handled by the single page frontend application
     */
    static InitStaticRoutes() {
        var routes = [
            /** Application routes **/
            { method: 'GET',  path: '/',         handler: ApplicationController.getIndexView },
            { method: 'GET',  path: '/created',  handler: ApplicationController.getIndexView },
            { method: 'GET',  path: '/about',    handler: ApplicationController.getIndexView },
            { method: 'GET',  path: '/notfound', handler: ApplicationController.getIndexView },
        ];

        this.server.route(routes);
    }

    /**
     * Gets the route configuration object for a directory that contains files and subdirectories to be served
     *
     * @param urlPath
     * @param staticPath
     * @returns {{method: string, path: string, handler: {directory: {path: string, listing: boolean}}}}
     */
    static getDirectoryRouteConfig(urlPath, staticPath) {
        return {
            method: 'GET',
            path: urlPath,
            handler: {
                directory: {
                    path: staticPath,
                    listing: false
                }
            }
        };
    }
}

module.exports.Init = Routes.Init;
