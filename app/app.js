'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const server = new Hapi.Server();
const Routes = require('./routes');
const MiniUrls = require('./Repositories/MiniUrls');
const muDb = require('./database/muDB');
const log = require('./libs/logger');


/**
 * Creates the server connection
 */
server.connection({ port: 3000 });

/**
 * Registers the plugin to handle static files and directories
 */
server.register(Inert, (err) => {
    if (err) {
        console.error('Failed to load plugin:', err);
        throw err;
    }
});

Routes.Init(server);

muDb.ready().then(
    () => {
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log('Server running at:', server.info.uri);
        });

        log.info('Database is ready!');
    },
    (error) => {
        log.info('Database is not ready!');
        log.error(error);
    }
);
