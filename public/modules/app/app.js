/*global require*/
'use strict';
define([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'angular-animate',
 'angular-messages',
 'oc-lazy-load',
 'satellizer',
 'angular-bootstrap',
 'bootstrap',
 'angular-xeditable',
 'angular-local-storage',
 'angular-css',
 'angular-wizard',
 'hammerjs',
 'angular-gestures',
 'angular-loading-bar',
 'angular-aside',
 //'angular-sanitize',
 //'angular-ui-select',
 'checklist-model',
 'ng-tags-input',
 'angular-aria',
 'angular-material',
 //'angular-swing',
 //'material',
 //'ripples',
 'infinite-scroll',
 'truncate-filters',
 'angular-grid',
 'angular-gridster',
 //'introjs',
 //'angular-introjs',
 //'dnd-draggable',
 'ng-joyride',
 //'ui-tab-scroll',
// '../auth/module',
 '../search/module',
 '../community/module',
 '../explorer/module',
 '../swipe/module',
 '../profile/module',
 '../questionnaire/module',
], function (angular) {

 var app = angular.module('app', [
  'ngAnimate',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'ngResource',
  'satellizer',
  'oc.lazyLoad',
  'ui.bootstrap',
  'xeditable',
  'LocalStorageModule',
  'angularCSS',
  'mgo-angular-wizard',
  'angular-gestures',
  'angular-loading-bar',
  'ngAside',
  //'ui.select',
  //'ngSanitize',
  'checklist-model',
  'ngTagsInput',
  'infinite-scroll',
  'ngAria',
  //'gajus.swing',
  'gb-filters.truncate',
  'angularGrid',
  'gridster',
  'ngJoyRide',
  //'angular-intro',
  //'dndLists',
  // 'app.auth',
  //'ui.tab.scroll',
  'app.search',
  'app.community',
  'app.explorer',
  'app.swipe',
  'app.profile',
  'app.questionnaire',
 ]);

 var appConfig = function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $httpProvider, $authProvider, localStorageServiceProvider, hammerDefaultOptsProvider, $provide) {

  $ocLazyLoadProvider.config({
   debug: true,
   loadedModules: ['app'],
   asyncLoader: require
  });

  localStorageServiceProvider
          .setPrefix('gb102')
          .setStorageType('localStorage')
          .setNotify(true, true);

  hammerDefaultOptsProvider.set({
   recognizers: [
    [Hammer.Tap, {time: 250}],
    [Hammer.Swipe, {}]
   ]
  });
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
       $state.go('apps.home');
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
  $urlRouterProvider.otherwise('/');
  $stateProvider
          .state('apps', {
           url: '',
           abstract: true,
           views: {
            "root": {
             controller: 'AppsCtrl as appsCtrl',
             templateUrl: 'public/modules/app/views/apps.html',
             resolve: {
              load: function ($ocLazyLoad) {
               return $ocLazyLoad.load({
                name: 'app',
                serie: true,
                files: [
                 'public/modules/app/services/constants.srv.js',
                 'public/modules/auth/services/auth.srv.js',
                 'public/modules/common/services/toast.srv.js',
                 'public/modules/common/directives/show-tab.drv.js',
                 'public/modules/common/directives/horizontal-scrolling.drv.js',
                 'public/modules/common/directives/sticky.drv.js',
                 'public/modules/search/services/search.srv.js',
                 'public/modules/auth/controllers/login-modal.ctrl.js',
                 'public/modules/auth/controllers/registration-modal.ctrl.js',
                 'public/modules/app/controllers/apps.ctrl.js',
                 'public/modules/explorer/directives/explorer-box.drv.js',
                 'public/modules/explorer/directives/explorer-box-2.drv.js',
                 'public/modules/app/controllers/menu-modal.ctrl.js'
                ]
               });
              }
             }
            }
           }
          })
          .state('apps.home', {
           url: '/',
           views: {
            "apps": {
             templateUrl: 'public/modules/app/views/apps-home.html',
             resolve: {
              load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app',
                 serie: true,
                 files: [
                  'public/modules/community/services/community.srv.js',
                  'public/modules/app/services/constants.srv.js',
                  'public/modules/explorer/services/component/components.srv.js',
                  'public/modules/explorer/controllers/explorers.ctrl.js',
                  'public/modules/explorer/controllers/add-explorer-modal.ctrl.js',
                  'public/modules/explorer/controllers/create-request-explorer-modal.ctrl.js',
                 ]
                });
               }],
              /*
               leve_categories: function (ConstantsSrv) {
               var constantsSrv = new ConstantsSrv();
               return constantsSrv.getConstants();
               }
               */
             }
            }
           }});
 };
 appConfig.$inject = ['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 'localStorageServiceProvider', 'hammerDefaultOptsProvider', '$provide'];
 app.config(appConfig);

 var appRun = function ($stateParams, $animate, $rootScope, $state, editableOptions, localStorageService) {
  $animate.enabled(false);
  $rootScope.$on('$stateChangeStart', function (event, toState) {
   var user = JSON.parse(localStorageService.get('user'));
   if (user) {
    $rootScope.authenticated = true;
    $rootScope.user = user;
    if (toState.name === "apps.home") {
     event.preventDefault();
     $state.go('apps.explorer');
    }
   } else {
    $rootScope.authenticated = false;
    //if (toState.name !== "auth") {
    // event.preventDefault();
    //  $state.go('auth');
    if (toState.name === "apps.home") {
     //event.preventDefault();
     //$state.go('auth');
    }
   }
  });

  editableOptions.theme = 'bs3';
  $animate.enabled(true);

 }
 appRun.$inject = ['$stateParams', '$animate', '$rootScope', '$state', 'editableOptions', 'localStorageService'];
 app.run(appRun);
 app.constant('_', window._);


 app.constant('level_categories',
         {
          "apps": 1,
          "skills": 2,
          "goals": 3,
          "hobbies": 4,
          "promises": 5,
          "mentorships": 6,
          "collaborations": 7,
          "teach": 8,
          "advices": 9,
          "groups": 10,
          "journals": 11,
          "request_type_skill": 1001,
          "request_type_goal": 1002,
          "todo_level_normal": 50000,
          "todo_level_progress": 50001,
          "todo_status_in_progress": 50100,
          "todo_status_later": 50101,
          "todo_status_done": 50102,
          "contribution_types": 4000,
          "explorer_relationship": {
           "parent": 6001,
           "application": 6002
          },
          "list": {
           "handpicked": 1
          },
          "share": {
           "explorer": 300000,
           "notes": 300001
          },
          "privacy_type": 10000,
          "privacy": {
           "private": 10001,
           "public": 10002,
           "customize": 10003
          },
          "component": {
           "none": 11001,
           "note": 11002,
           "guideline": 11003,
           "activity": 11004,
           "weblink": 11005
          },
          "component_background_colors": 13000,
          "default_component_background_color": 13001
         });
 return app;
});