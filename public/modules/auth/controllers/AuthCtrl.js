'use strict';

var authCtrl = function (ConstantsManager, $scope, $auth, $state, $http, $rootScope, localStorageService, $css) {
 var vm = this;

 vm.constantsManager = new ConstantsManager();
 vm.skillIcons = [];
 vm.skillIconsArray = [];

 var getRand = function (min, max) {
  return Math.floor((Math.random() * max) + min);
 };
 vm.getRandomSkillIcons = function () {
  vm.skillIconsArray = [];
  for (var i = 0; i < 200; i++) {
   var rand = getRand(0, vm.skillIcons.length);
   vm.skillIconsArray.push(rand);
  }
 };

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-1.css'
 }, $scope);
 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-landing-page.css'
 }, $scope);

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

 vm.constantsManager.getIcons(1).then(function (data) {
  vm.skillIcons = data;
  vm.getRandomSkillIcons();
 });
};

authCtrl.$inject = ['ConstantsManager', '$scope', '$auth', '$state', '$http', '$rootScope', 'localStorageService', '$css'];

angular.module('app').controller('AuthCtrl', authCtrl)
