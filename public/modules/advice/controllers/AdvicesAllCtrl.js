var advicesAllCtrl = function (
        ConstantsManager,
        AdvicesManager,
        SearchManager,
        isSearch,
        $scope,
        $state,
        $stateParams,
        $http,
        $rootScope,
        $location,
        $uibModal,
        $log,
        $filter) {

 var vm = this;
 vm.advices = [];

 vm.advicesManager = new AdvicesManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.advices = data;
  });
 } else {
  vm.advicesManager.getAllAdvices().then(function (data) {
   vm.advices = data;
  });
 }


};

advicesAllCtrl.$inject = [
 'ConstantsManager',
 'AdvicesManager',
 'SearchManager',
 'isSearch',
 '$scope',
 '$state',
 '$stateParams',
 '$http',
 '$rootScope',
 '$location',
 '$uibModal',
 '$log',
 '$filter'];

angular.module("app.advice").controller('AdvicesAllCtrl', advicesAllCtrl);
