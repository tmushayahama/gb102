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
  'explore hobby',
  'collaborate on skills',
 ];

 vm.constantsSrv = new ConstantsSrv();

 $css.bind({
  href: 'public/css/gb-sass/stylesheets/gb-themes/app-theme-explorer.css'
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
   size: 'login',
   resolve: {
   }
  });

  modalInstance.result.then(function (skill) {
   //vm.skillsSrv.createSkill(skill);
  }, function () {
   console.log('Modal dismissed at: ' + new Date());
  });
 };

 vm.openRegistrationModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'registration-modal.html',
   controller: 'RegistrationModalCtrl as registrationModalCtrl',
   backdrop: 'static',
   size: 'registration',
   resolve: {
   }
  });

  modalInstance.result.then(function (skill) {
   //vm.skillsSrv.createSkill(skill);
  }, function () {
   console.log('Modal dismissed at: ' + new Date());
  });
 };
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
