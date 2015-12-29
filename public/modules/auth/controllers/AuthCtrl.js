'use strict';

var authCtrl = function (ConstantsManager, $scope, $auth, $state, $http, $rootScope, localStorageService, $interval, $css) {
 var vm = this;

 var headerWords = [
  'achieve a goal',
  'mentor someone',
  'improve a skill',
  'give an advice',
  'discover a new skill',
  'keep a promise',
  'be mentored by someone',
  'explore a new hobby',
  ''
 ];
 var headerWordIndex = 0;
 vm.headerWord = headerWords[0];
 $interval(function () {
  vm.headerWord = headerWords[headerWordIndex];
  headerWordIndex = (headerWordIndex + 1) % headerWords.length;
 }, 3000);

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

authCtrl.$inject = ['ConstantsManager', '$scope', '$auth', '$state', '$http', '$rootScope', 'localStorageService', '$interval', '$css'];

angular.module('app').controller('AuthCtrl', authCtrl)
