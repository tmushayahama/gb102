'use strict';
var appsCtrl = function (
        SearchSrv,
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

 vm.searchParams;

 var _selected;

 $scope.selected = undefined;

 vm.searchSrv = new SearchSrv();

 $rootScope.getSearchSuggestions = function (val) {
  var searchData = {
   query: val
  };
  return vm.searchSrv.simpleSearchSuggestion(searchData)
          .then(function (response) {
           //vm.suggestions = response.data;
           return response.data;
          });
 };

 $scope.modelOptions = {
  debounce: {
   default: 500,
   blur: 250
  },
  getterSetter: true
 };

 vm.clearSearch = function ($event, $select) {

 }

 $rootScope.search = function () {
  //$rootScope.searchParams = vm.searchParams;
  $state.go('apps.search.all', null, {reload: 'apps.search.all'});
  //vm.searchSrv.simpleSearch(vm.searchParams);
 }

 $rootScope.openSearchModal = function () {
  var modalInstance = $aside.open({
   animation: true,
   placement: 'top',
   templateUrl: 'search-modal.html',
   //controller: 'AddExplorerCtrl as addExplorerCtrl',
   size: 'gb-search',
  });

  modalInstance.result.then(function (explorer) {
  });
 };

 $rootScope.openMenuModal = function (position) {
  var modalInstance = $aside.open({
   placement: position,
   templateUrl: 'menu-modal.html',
   controller: 'MenuModalCtrl as menuModalCtrl',
   // backdrop: 'static',
   size: 'menu'
  });

  modalInstance.result.then(function () {
  }, function () {
  });
 };
};

appsCtrl.$inject = [
 'SearchSrv',
 '$scope',
 '$auth',
 '$state',
 '$http',
 '$rootScope',
 '$uibModal',
 '$aside',
 'localStorageService'];

angular.module("app").controller('AppsCtrl', appsCtrl);
