'use strict';

var authCtrl = function (
        ConstantsSrv,
        $scope,
        $uibModal,
        $auth,
        $state,
        $http,
        $rootScope,
        localStorageService,
        $interval,
        $css) {
 var vm = this;

 var headerWords = [
  'achieve goals',
  'mentor someone',
  'improve skills',
  'give advice',
  'discover skills',
  'keep promises',
  'get mentorship',
  'explorer hobby',
  'collaborate on skills',
 ];
 var headerWordIndex = 0;
 vm.headerWord = headerWords[0];
 $interval(function () {
  vm.headerWord = headerWords[headerWordIndex];
  headerWordIndex = (headerWordIndex + 1) % headerWords.length;
 }, 3000);

 vm.constantsSrv = new ConstantsSrv();
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
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-skill.css'
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

 vm.openLoginModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'login-modal.html',
   controller: 'LoginModalCtrl as loginModalCtrl',
   backdrop: 'static',
   size: 'md',
   resolve: {
   }
  });

  modalInstance.result.then(function (skill) {
   //vm.skillsSrv.createSkill(skill);
  }, function () {
   console.log('Modal dismissed at: ' + new Date());
  });
 };



 vm.constantsSrv.getIcons(1).then(function (data) {
  vm.skillIcons = data;
  vm.getRandomSkillIcons();
 });
};

authCtrl.$inject = [
 'ConstantsSrv',
 '$scope',
 '$uibModal',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 'localStorageService',
 '$interval',
 '$css'];

angular.module('app').controller('AuthCtrl', authCtrl);