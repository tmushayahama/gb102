var explorersAppCtrl = function (
        ConstantsSrv,
        ExplorersSrv,
        SearchSrv,
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

 vm.explorersSrv = new ExplorersSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.explorers = data;
  });
 } else {
  vm.explorersSrv.getAppExplorers(vm.appName).then(function (data) {
   vm.explorers = data;
  });
 }
};

explorersAppCtrl.$inject = [
 'ConstantsSrv',
 'ExplorersSrv',
 'SearchSrv',
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

angular.module("app.explorer").controller('ExplorersAppCtrl', explorersAppCtrl);
