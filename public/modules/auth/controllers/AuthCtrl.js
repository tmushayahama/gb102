'use strict';
angular.module('app').controller('AuthCtrl', ['$scope', '$auth', '$state', '$http', '$rootScope', 'localStorageService',
 function ($scope, $auth, $state, $http, $rootScope, localStorageService) {
  var vm = this;

  $scope.$on('ocLazyLoad.moduleLoaded', function (e, params) {
   //console.log('event module loaded', params);
  });

  $scope.$on('ocLazyLoad.componentLoaded', function (e, params) {
   //console.log('event component loaded', params);
  });

  $scope.$on('ocLazyLoad.fileLoaded', function (e, file) {
   console.log('event file loaded', file);
  });

  vm.loginError = false;
  vm.loginErrorText;

  vm.login = function () {
   var credentials = {
    email: vm.email,
    password: vm.password
   }

   $auth.login(credentials).then(function ()
   {
    return $http.get('api/authenticate/user');
   }, function (error) {
    vm.loginError = true;
    vm.loginErrorText = error.data.error;
   }).then(function (response) {

    // Stringify the returned data to prepare it
    // to go into local storage
    var user = JSON.stringify(response.data.user);
    // Set the stringified user data into local storage
    localStorageService.set('user', user);
    // The user's authenticated state gets flipped to
    // true so we can now show parts of the UI that rely
    // on the user being logged in
    $rootScope.authenticated = true;
    // Putting the user's data on $rootScope allows
    // us to access it anywhere across the app
    $rootScope.currentUser = response.data.user;
    // Everything worked out so we can now redirect to
    // the users state to view the data
    //var loginModal =
    $("#gb-login-modal").modal("hide");
    $state.go('users');
   });
  };
 }
])




/*

 define([
 'angular'
 ], function () {
 return ['$auth', '$state', '$http', '$rootScope',
 function ($auth, $state, $http, $rootScope) {
 var vm = this;
 vm.loginError = false;
 vm.loginErrorText;

 vm.login = function () {
 var credentials = {
 email: vm.email,
 password: vm.password
 }

 $auth.login(credentials).then(function ()
 {
 // Return an $http request for the now authenticated
 // user so that we can flatten the promise chain
 return $http.get('api/authenticate/user');
 // Handle errors
 }, function (error) {
 vm.loginError = true;
 vm.loginErrorText = error.data.error;
 // Because we returned the $http.get request in the $auth.login
 // promise, we can chain the next promise to the end here
 }).then(function (response) {

 // Stringify the returned data to prepare it
 // to go into local storage
 var user = JSON.stringify(response.data.user);
 // Set the stringified user data into local storage
 localStorage.setItem('user', user);
 // The user's authenticated state gets flipped to
 // true so we can now show parts of the UI that rely
 // on the user being logged in
 $rootScope.authenticated = true;
 // Putting the user's data on $rootScope allows
 // us to access it anywhere across the app
 $rootScope.currentUser = response.data.user;
 // Everything worked out so we can now redirect to
 // the users state to view the data
 //var loginModal =
 $("#gb-login-modal").modal("hide");
 $state.go('users');
 });
 };
 }
 ]
 });
 */