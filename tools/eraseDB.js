'use strict';
let muDB = require('../app/database/muDB');

/**
 * Clears the collection of the test database
 */
muDB.ready().then(
    () => {
        let dropMiniUrls = muDB.miniUrls.drop();
        let dropMiniUrlsCustom = muDB.miniUrlsCustom.drop();
        let dropHashIdInfo = muDB.hashIdInfo.drop();

        return Promise.all([dropMiniUrls, dropMiniUrlsCustom, dropHashIdInfo]).then(
            () => {
                console.log('Database erased!');
                muDB.disconnect();
            },
            (error) => {
                console.error(error);
                console.error('ERROR: Database was not erased!');
                muDB.disconnect();
            }
        )
    },
    (error) => {
        console.error(error);
        console.error('Unable to setup database!!!');
    }
);
