'use strict';
var appsCtrl = function (
        $scope,
        $auth,
        $state,
        $http,
        $rootScope,
        $uibModal,
        $aside,
        localStorageService) {

 var vm = this;

 vm.logout = function () {
  localStorageService.remove('user');
  $rootScope.authenticated = false;
  $state.go('auth');
 };


 vm.openMenuModal = function (position) {
  var modalInstance = $aside.open({
   placement: position,
   templateUrl: 'menu-modal.html',
   controller: 'MenuModalCtrl as menuModalCtrl',
   // backdrop: 'static',
   size: 'menu',
   resolve: {
    appTypes: function () {
     return vm.appTypes;
    }
   }
  });

  modalInstance.result.then(function () {
  }, function () {
  });
 };
};

appsCtrl.$inject = [
 '$scope',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 '$uibModal',
 '$aside',
 'localStorageService'];

angular.module("app").controller('AppsCtrl', appsCtrl);
