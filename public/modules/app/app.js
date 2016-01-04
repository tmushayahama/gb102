/*global require*/
'use strict';
define([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'angular-animate',
 'oc-lazy-load',
 'satellizer',
 'angular-bootstrap',
 'bootstrap',
 'angular-xeditable',
 'angular-local-storage',
 'angular-css',
 'angular-wizard',
 //'ionic.tdcards',
 '../auth/module',
 '../explores/module',
 '../swipes/module',
], function (angular) {

 var app = angular.module('app', [
  'ui.router',
  'ngResource',
  'ngAnimate',
  'satellizer',
  'oc.lazyLoad',
  'ui.bootstrap',
  'xeditable',
  'LocalStorageModule',
  'door3.css',
  // 'ionic.contrib.ui.tinderCards',
  'mgo-angular-wizard',
  'app.explores',
  'app.swipes'
 ]);

 var appConfig = function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $httpProvider, $authProvider, localStorageServiceProvider, $provide) {

  $ocLazyLoadProvider.config({
   debug: true,
   loadedModules: ['app'],
   asyncLoader: require
  });

  localStorageServiceProvider
          .setPrefix('gb102')
          .setStorageType('localStorage')
          .setNotify(true, true);
  // $urlRouterProvider.otherwise('/auth');
  function redirectWhenLoggedOut($q, $injector, localStorageService) {
   return {
    responseError: function (rejection) {

     // Need to use $injector.get to bring in $state or else we get
     // a circular dependency error
     var $state = $injector.get('$state');
     // Instead of checking for a status code of 400 which might be used
     // for other reasons in Laravel, we check for the specific rejection
     // reasons to tell us if we need to redirect to the login state
     var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
     // Loop through each rejection reason and redirect to the login
     // state if one is encountered
     angular.forEach(rejectionReasons, function (value, key) {
      if (rejection.data.error === value) {
       localStorageService.remove('user');
       $state.go('auth');
      }
     });
     return $q.reject(rejection);
    }
   }
  }

  // Setup for the $httpInterceptor
  //$provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
  // Push the new factory onto the $http interceptor array
  //$httpProvider.interceptors.push('redirectWhenLoggedOut');
  $authProvider.loginUrl = '/api/authenticate';
  $urlRouterProvider.otherwise('/auth');
  $stateProvider
          .state('apps', {
           url: '/apps',
           abstract: true,
           views: {
            "root": {
             controller: 'AppsCtrl as appsCtrl',
             templateUrl: 'public/modules/app/views/appsView.html',
             resolve: {
              load: function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                name: 'app',
                files: ['public/modules/common/directives/show-tab.js',
                 'public/modules/app/controllers/AppsCtrl.js']
               });
              }
             }
            }
           }
          });
 }
 appConfig.$inject = ['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 'localStorageServiceProvider', '$provide'];
 app.config(appConfig);

 var appRun = function ($stateParams, $rootScope, $state, editableOptions, localStorageService) {

  $rootScope.$on('$stateChangeStart', function (event, toState) {
   var user = JSON.parse(localStorageService.get('user'));
   if (user) {
    $rootScope.authenticated = true;
    $rootScope.user = user;
    if (toState.name === "auth") {
     event.preventDefault();
     $state.go('apps.skills.all');
    }
   } else {
    if (toState.name !== "auth") {
     event.preventDefault();
     $state.go('auth');
    }
   }
  });

  editableOptions.theme = 'bs3';
 }
 appRun.$inject = ['$stateParams', '$rootScope', '$state', 'editableOptions', 'localStorageService'];
 app.run(appRun);
 app.constant('_', window._);
 app.constant('level_categories',
         {
          skill: 1,
          goal: 2,
          hobby: 3,
          promise: 4,
          mentorship: 5,
          collaboration: 6,
          teach: 7,
          advice: 8,
          group: 9,
          journal: 10,
          skill_swipe: 11,
          goal_swipe: 12,
          hobby_swipe: 13,
          promise_swipe: 14,
          mentorship_swipe: 15,
          advice_swipe: 16,
         });

 return app;
});