const urlParser = require('../../lib/urlParser/urlParser');
const MiniUrlRepository = require('../Repositories/MiniUrls');
const hashIdsConstants = require('../../global/globals').hashIds;
const customIdsConstants = require('../../global/globals').customAlias;
const Boom = require('boom');

class ShrinkUrlController {
    static Shrink(request, reply) {
        let url = request.payload.url ? request.payload.url.trim() : '';
        let alias = request.payload.alias ? request.payload.alias.trim().toLowerCase() : '';

        if (ShrinkUrlController.VerifyUrlOrFail(url, reply)) {

            if (!alias) {
                MiniUrlRepository.addUrl(url).then(
                    (hash) => {
                        reply( { alias:hash });
                    },
                    (error) => {
                        reply(error);
                    }
                );
            } else if (ShrinkUrlController.VerifyAliasOrFail(alias, reply)) {
                MiniUrlRepository.addUrlWithAlias(url, alias).then(
                    (alias) => {
                        reply({ alias: request.payload.alias });
                    },
                    (error) => {
                        reply(error);
                    }
                );
            }
        }
    }

    static VerifyUrlOrFail(url, reply) {
        if (!url) {
            reply(Boom.badRequest('Missing URL'));
            return false;
        }

        if (url.startsWith('javascript:')) {
            reply(Boom.forbidden('javascript is not allowed!'));
            return false;
        }

        if (!url.length > 2000) {
            reply(Boom.uriTooLong('URL should be less or equal to 2000 characters!'));
            return false;
        }

        if (!urlParser.parse(url)) {
            reply(Boom.badRequest('Malformed URL'));
            return false;
        }

        return true;
    }

    static VerifyAliasOrFail(alias, reply) {
        let forbiddenAliases = [ 'api', 'css', 'js', 'created', 'about', 'notfound', 'favicon.ico' ];
        if (alias.length > 0) {

            if (alias.length > 20) {
                reply(Boom.forbidden('Alias should be at the most 20 charactes long.'));
                return false;
            }

            /** Parser should catch this but what if parser changes, we explicitly check for this */
            if (alias.startsWith('javascript:')) {
                reply(Boom.forbidden('javascript is not allowed!'));
                return false;
            }

            for (let badAlias of forbiddenAliases) {
                if (alias.toLowerCase() == badAlias) {
                    reply(Boom.conflict('Alias already exists. Please try another one. Don\'t be sneaky!'));
                    return false;
                }
            }

            if (!customIdsConstants.regExp.test(alias)) {
                reply(Boom.badRequest('Alias should contain letters and dashes (-) only.'));
                return false;
            }

            if (alias[0] == '-' || alias[alias.length - 1] == '-') {
                reply(Boom.badRequest('Alias should contain dashes (-) at the beginning or end.'));
                return false;
            }
        }

        return true;
    }
}

module.exports = ShrinkUrlController;