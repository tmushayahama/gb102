var explorersAllCtrl = function (
        ConstantsSrv,
        ExplorersSrv,
        SearchSrv,
        listType,
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

 $rootScope.subAppName = "ALL";

 vm.explorersSrv = new ExplorersSrv();

 switch (listType) {
  case 1:
   vm.explorersSrv.getAllExplorers().then(function (data) {
    vm.explorers = data;
   });
   break;
  case 2:
   vm.userId = $stateParams.profileId;
   vm.explorersSrv.getUserExplorers(vm.userId).then(function (data) {
    vm.explorers = data;
   });
   break;
  case 3:
   vm.searchSrv = new SearchSrv();
   var searchData = {
    query: $rootScope.searchKeyword
   };
   vm.searchSrv.simpleSearch(searchData).then(function (data) {
    vm.explorers = data;
   });
   break;
 }
};

explorersAllCtrl.$inject = [
 'ConstantsSrv',
 'ExplorersSrv',
 'SearchSrv',
 'listType',
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
