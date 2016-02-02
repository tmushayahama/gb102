var advicesAppCtrl = function (
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

 vm.appName = $stateParams.app_name;

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
  vm.advicesManager.getAppAdvices(vm.appName).then(function (data) {
   vm.advices = data;
  });
 }
};

advicesAppCtrl.$inject = [
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

angular.module("app.advice").controller('AdvicesAppCtrl', advicesAppCtrl);
