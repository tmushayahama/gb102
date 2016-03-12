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
 //'material',
 //'ripples',
 'infinite-scroll',
 'truncate-filters',
 '../auth/module',
 '../search/module',
 '../community/module',
 '../explorer/module',
 '../swipe/module',
 '../profile/module',
 '../questionnaire/module',
 '../mentorship/module',
 '../teach/module',
 '../advice/module',
 '../collaboration/module',
 '../goal/module',
 '../journal/module',
 '../project/module',
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
  'ngMaterial',
  'gb-filters.truncate',
  'app.auth',
  'app.search',
  'app.community',
  'app.explorer',
  'app.swipe',
  'app.profile',
  'app.questionnaire',
  'app.mentorship',
          //'app.teach',
          //'app.advice',
          //'app.collaboration',
          //'app.goal',
          //'app.journal',
          //'app.project'
 ]);

 var appConfig = function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $httpProvider, $authProvider, localStorageServiceProvider, hammerDefaultOptsProvider, $provide) {

  $ocLazyLoadProvider.config({
   debug: true,
   loadedModules: ['app', 'app.auth'],
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
                 'public/modules/common/directives/show-tab.drv.js',
                 'public/modules/common/directives/sticky.drv.js',
                 'public/modules/search/services/search.srv.js',
                 'public/modules/app/controllers/apps.ctrl.js',
                 'public/modules/app/controllers/menu-modal.ctrl.js',
                ]
               });
              }
             }
            }
           }
          });
 };
 appConfig.$inject = ['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 'localStorageServiceProvider', 'hammerDefaultOptsProvider', '$provide'];
 app.config(appConfig);

 var appRun = function ($stateParams, $rootScope, $state, editableOptions, localStorageService) {
  //$.material.init();
  $rootScope.$on('$stateChangeStart', function (event, toState) {
   var user = JSON.parse(localStorageService.get('user'));
   if (user) {
    $rootScope.authenticated = true;
    $rootScope.user = user;
    if (toState.name === "auth") {
     event.preventDefault();
     $state.go('apps.explorer.all');
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
          request_type_offset: 1000,
          skills: 1,
          goals: 2,
          hobbies: 3,
          promises: 4,
          mentorships: 5,
          collaborations: 6,
          teach: 7,
          advices: 8,
          groups: 9,
          journals: 10,
          request_type_skill: 1001,
          request_type_goal: 1002,
          todo_level_normal: 50000,
          todo_level_progress: 50001,
          todo_status_in_progress: 50100,
          todo_status_later: 50101,
          todo_status_done: 50102,
          contribution_types: 60000,
         });

 return app;
});