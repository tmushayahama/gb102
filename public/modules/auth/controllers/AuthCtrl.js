'use strict';

var authCtrl = function ($scope, $auth, $state, $http, $rootScope, localStorageService) {
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
  };

  $auth.login(credentials).then(function ()
  {
   return $http.get('api/authenticate/user');
  }, function (error) {
   vm.loginError = true;
   vm.loginErrorText = error.data.error;
  }).then(function (response) {
   var user = JSON.stringify(response.data.user);
   localStorageService.set('user', user);
   $rootScope.authenticated = true;
   $rootScope.user = response.data.user;
   $("#gb-login-modal").modal("hide");
   $state.go('apps.skills');
  });
 };
};

authCtrl.$inject = ['$scope', '$auth', '$state', '$http', '$rootScope', 'localStorageService']

angular.module('app').controller('AuthCtrl', authCtrl)
