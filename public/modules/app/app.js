/*global require*/
'use strict';
define([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'oc-lazy-load',
 'satellizer',
 'angular-bootstrap',
 'bootstrap',
 'angular-xeditable',
 '../auth/module',
 '../skills/module'
], function (angular) {

 var app = angular.module('app', [
  'ui.router',
  'ngResource',
  'satellizer',
  'oc.lazyLoad',
  'ui.bootstrap',
  'xeditable',
  'app.auth',
  'app.skills'
          //'app.skills'
 ]);
 // var app = angular.module('mainModule', ['ui.router', 'oc.lazyLoad']);
 app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', '$provide',
  function ($ocLazyLoadProvider, $stateProvider, $urlRouterProvider, $httpProvider, $authProvider, $provide) {

   $ocLazyLoadProvider.config({
    debug: true,
    loadedModules: ['app'],
    asyncLoader: require
   });
   // $urlRouterProvider.otherwise('/auth');
   function redirectWhenLoggedOut($q, $injector) {

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

        // If we get a rejection corresponding to one of the reasons
        // in our array, we know we need to authenticate the user so
        // we can remove the current user from local storage
        localStorage.removeItem('user');
        // Send the user to the auth state so they can login
        // $state.go('auth');
       }
      });
      return $q.reject(rejection);
     }
    }
   }

   // Setup for the $httpInterceptor
   $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
   // Push the new factory onto the $http interceptor array
   $httpProvider.interceptors.push('redirectWhenLoggedOut');
   $authProvider.loginUrl = '/api/authenticate';
   $urlRouterProvider.otherwise('/auth');
   $stateProvider
           .state('apps', {
            url: '/apps',
            abstract: true,
            views: {
             "root": {
              templateUrl: 'public/modules/app/views/appsView.html',
              resolve: {
               load: function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                 name: 'app',
                 files: ['public/modules/app/controllers/AppsCtrl.js']
                });
               }
              }
             }
            }
           })
           .state('module1', {
            url: '/module1',
            templateUrl: 'public/modules/module1/module1.html',
            resolve: {
             load: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
               name: 'module1',
               files: ['public/modules/module1/module.js']
              });
             }
            }
           })

           .state('module2', {
            url: '/module2',
            templateUrl: 'public/modules/module2/module2.html',
            resolve: {
             load: function ($ocLazyLoad) {
              return $ocLazyLoad.load({
               name: 'module2',
               files: ['public/modules/module2/module.js']
              });
             }
            }
           });
  }
 ]);
 app.run(function ($stateParams, $rootScope, $state, editableOptions) {

  // $stateChangeStart is fired whenever the state changes. We can use some parameters
  // such as toState to hook into details about the state as it is changing
  $rootScope.$on('$stateChangeStart', function (event, toState) {

   // Grab the user from local storage and parse it to an object
   var user = JSON.parse(localStorage.getItem('user'));
   // If there is any user data in local storage then the user is quite
   // likely authenticated. If their token is expired, or if they are
   // otherwise not actually authenticated, they will be redirected to
   // the auth state because of the rejected request anyway
   /*
    if (user) {

    // The user's authenticated state gets flipped to
    // true so we can now show parts of the UI that rely
    // on the user being logged in
    $rootScope.authenticated = true;
    // Putting the user's data on $rootScope allows
    // us to access it anywhere across the app. Here
    // we are grabbing what is in local storage
    $rootScope.currentUser = user;
    // If the user is logged in and we hit the auth route we don't need
    // to stay there and can send the user to the main state
    if (toState.name === "auth") {

    // Preventing the default behavior allows us to use $state.go
    // to change states
    event.preventDefault();
    // go to the "main" state which in our case is users
    $state.go('users');
    }
    } else {
    if (toState.name !== "auth") {
    event.preventDefault();
    //$state.go('auth');
    }
    */
  });

  editableOptions.theme = 'bs3';
 });
 return app;
});