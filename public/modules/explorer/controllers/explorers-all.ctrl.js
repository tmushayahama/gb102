var explorersAllCtrl = function (
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
 vm.explorers = [];

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
  vm.explorersSrv.getAllExplorers().then(function (data) {
   vm.explorers = data;
  });
 }


};

explorersAllCtrl.$inject = [
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

angular.module("app.explorer").controller('ExplorersAllCtrl', explorersAllCtrl);
