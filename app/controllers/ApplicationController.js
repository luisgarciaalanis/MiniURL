'use strict';
const ShrinkUrlStore = null;//require('./ShrinkUrlStore.Memory');
const MiniUrlsRepository = require('../Repositories/MiniUrls');

class ApplicationController
{
    /**
     * Returns the index.html
     *
     * @param request
     * @param reply
     */
    getIndexView(request, reply) {
        reply.file('./public/index.html');
    }

    /**
     * Returns the favicon.
     *
     * @param request
     * @param reply
     */
    getFavicon(request, reply) {
        reply.file('./public/favicon.ico');
    }

    /**
     * Redirects to the URL on the database or to notfound if it was not found.
     *
     * @param request
     * @param reply
     */
    redirect(request, reply) {

        MiniUrlsRepository.getUrl(request.params.hash.trim().toLowerCase()).then(
            (url) => {
                reply.redirect(url);
            },
            () => {
                reply.redirect('/notfound');
            }
        );
    }
}

module.exports = new ApplicationController;