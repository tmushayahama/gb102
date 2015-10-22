/*global require*/
'use strict';

require([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'satellizer',
 'bootstrap',
 '../modules/skills/module'
], function (angular) {
 require([
  '../modules/app/controllers/UserCtrl',
  '../modules/app/controllers/AppsCtrl',
  '../modules/auth/controllers/AuthCtrl',
  '../modules/skills/module'
 ], function (userCtrl, appsCtrl, authCtrl) {
  angular.module('gbApp',
          ['ui.router',
           'satellizer',
           'ngResource',
           'app.skills'])
          .controller('UserCtrl', userCtrl)
          .controller('AppsCtrl', appsCtrl)
          .controller('AuthCtrl', authCtrl)
          .config(function ($stateProvider, $authProvider, $httpProvider, $provide) {

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
                $state.go('auth');
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
           //$urlRouterProvider.otherwise('/auth');

           $stateProvider.state('auth', {
            url: '/auth',
            templateUrl: 'public/modules/auth/views/authView.html',
            controller: 'AuthCtrl as auth'
           }).state('users', {
            url: '/users',
            templateUrl: 'public/modules/app/views/userView.html',
            controller: 'UserCtrl as user'
           }).state('apps', {
            url: '/apps',
            templateUrl: 'public/modules/app/views/appsView.html',
            controller: 'AppsCtrl as apps'
           }).state('app.skills', {
            url: '/skills',
            templateUrl: 'public/views/skill/skillsView.html',
            controller: 'SkillsCtrlk as skillsCtrl'
           }).state('time', {
            url: '/time',
            templateUrl: 'public/views/timeEntryView.html',
            controller: 'TimeEntryCtrl as timeEntry'
           });
           //$locationProvider.html5Mode(true);
          })
          .run(function ($rootScope, $state) {

           // $stateChangeStart is fired whenever the state changes. We can use some parameters
           // such as toState to hook into details about the state as it is changing
           $rootScope.$on('$stateChangeStart', function (event, toState) {

            // Grab the user from local storage and parse it to an object
            var user = JSON.parse(localStorage.getItem('user'));
            // If there is any user data in local storage then the user is quite
            // likely authenticated. If their token is expired, or if they are
            // otherwise not actually authenticated, they will be redirected to
            // the auth state because of the rejected request anyway
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
            }
           });
          });

  angular.bootstrap(document, ['gbApp']);
 });
});







/*


 'use strict';
 define([
 'angular',
 'angular-ui-router',
 'angular-resource',
 'satellizer',
 '../skills/module',
 './controllers/AppsCtrl',
 './controllers/UserCtrl',
 '../auth/controllers/AuthCtrl'
 ], function (angular) {
 // Declare app level module which depends on views, and components
 return angular.module('gbApp',
 [
 'ui.router',
 'satellizer',
 'ngResource',
 'app.skills',
 '../controllers/UserCtrl',
 ])

 .config(function ($stateProvider, $authProvider, $httpProvider, $provide) {

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
 $state.go('auth');
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
 //$urlRouterProvider.otherwise('/auth');

 $stateProvider.state('auth', {
 url: '/auth',
 templateUrl: 'public/views/authView.html',
 controller: 'AuthCtrl as auth'
 }).state('users', {
 url: '/users',
 templateUrl: 'public/modules/app/views/userView.html',
 controller: 'UserCtrl as user'
 }).state('apps', {
 url: '/apps',
 templateUrl: 'public/views/appsView.html',
 controller: 'AppsCtrl as apps'
 }).state('time', {
 url: '/time',
 templateUrl: 'public/views/timeEntryView.html',
 controller: 'TimeEntryCtrl as timeEntry'
 });
 //$locationProvider.html5Mode(true);
 })
 .run(function ($rootScope, $state) {

 // $stateChangeStart is fired whenever the state changes. We can use some parameters
 // such as toState to hook into details about the state as it is changing
 $rootScope.$on('$stateChangeStart', function (event, toState) {

 // Grab the user from local storage and parse it to an object
 var user = JSON.parse(localStorage.getItem('user'));
 // If there is any user data in local storage then the user is quite
 // likely authenticated. If their token is expired, or if they are
 // otherwise not actually authenticated, they will be redirected to
 // the auth state because of the rejected request anyway
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
 }
 });
 });
 });
 */