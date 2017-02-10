'use strict';
const ShrinkUrlStore = null;//require('./ShrinkUrlStore.Memory');
const MiniUrlsRepository = require('../Repositories/MiniUrls');

class ApplicationController
{
    getIndexView(request, reply) {
        reply.file('./public/index.html');
    }

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