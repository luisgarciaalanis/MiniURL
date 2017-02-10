'use strict';

/**
 * This interceptor captures the error generated when the page is running but the server is down and transforms it into
 * a 503 HTTP ERROR (Service unavailable).
 *
 * @param $httpProvider
 */
function configResponseError($httpProvider) {
    $httpProvider.interceptors.push(['$q', function($q) {
        return {
            responseError: function(rejection) {
                if(rejection.status == -1) {
                    return $q.reject({ status: 503 });
                }
                return $q.reject(rejection);
            }
        };
    }]);
}

configResponseError.$inject = [ '$httpProvider' ];

/**
 * Export function to initialize the Response Error Interceptor
 *
 * @param app
 */
module.exports.Init = function(app) {
    app.config(configResponseError);
};
