'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const server = new Hapi.Server();
const Routes = require('./routes');
const muDB = require('./database/muDB');
const HashIds = require('./Repositories/HashIds');
const HashIdsInfo = require('./Repositories/HashIdsInfo');
const log = require('./libs/logger');

/** Creates the server connection */
server.connection({ port: 3000 });

/** Registers the plugin to handle static files and directories */
server.register(Inert, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
        throw err;
    }
});

/** Initializes the routes */
Routes.Init(server);

muDB.ready().then(
    () => {
        HashIdsInfo.ready().then(
            () => {
                HashIds.seedIfEmpty().then(
                    () => {
                        server.start((err) => {
                            if (err) {
                                throw err;
                            }
                            console.log('Server running at:', server.info.uri);
                        });

                        log.info('Database is ready!');
                    }
                );
            }
        );
    },
    (error) => {
        log.info('Database is not ready!');
        log.error(error);
    }
);
