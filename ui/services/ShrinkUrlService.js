'use strict';

/**
 * NOTE: Since the API is only one I am not using any REST helper module like ngResouce to save some space.
 *
 * Used to shrink a url
 *
 * @param $http
 * @constructor
 */
function ShrinkUrlService($http) {
    this.shrinkResult = null;

    /**
     * Clears the shrinkResult member variable so that any hard refresh on the results page is redirected to the create
     * page instead.
     */
    this.clear = function () {
        this.shrinkResult = null;
    };

    /**
     * POSTs a call to the shrink API with the url and alias information
     *
     * @param url
     * @param alias
     * @returns {*|Promise.<TResult>}
     */
    this.shrink = function (url, alias) {
        return $http.post('/api/v1/shrink', {
            url: url,
            alias: alias
        }).then(
            function (result) {
                this.shrinkResult = result.data;
                this.shrinkResult.url = url;
                return this.shrinkResult;
            }.bind(this)
        );
    };
}

ShrinkUrlService.$inject = [ '$http' ];

/**
 * Initializes the ShrinkUrlService used to shrink a url.
 * @param app
 * @constructor
 */
module.exports.Init = function(app) {
    app.service('ShrinkUrlService', ShrinkUrlService);
};