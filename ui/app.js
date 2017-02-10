'use strict';
var routes = require('./routes');
var muAppFrame = require('./components/muAppFrame/muAppFrame.component');
var muCreate = require('./components/muCreate/muCreate.component');
var muCreated = require('./components/muCreated/muCreated.component');
var muAbout = require('./components/muAbout/muAbout.component');
var muNotFound = require('./components/muNotFound/muNotFound.component');
var shrinkUrlService = require('./services/ShrinkUrlService');
var responseErrorInterceptor = require('./interceptors/responseError');

var muApp = angular.module('shrinkUrl', [ 'ui.router', 'ui.bootstrap' ] );

/**
 * Initializing routes
 */
routes.Init(muApp);

/**
 * Initializing services
 */
shrinkUrlService.Init(muApp);

/**
 * Initializing interceptors
 */
responseErrorInterceptor.Init(muApp);

/**
 * Initializing components
 */
muAppFrame.Init(muApp);
muCreate.Init(muApp);
muCreated.Init(muApp);
muAbout.Init(muApp);
muNotFound.Init(muApp);

