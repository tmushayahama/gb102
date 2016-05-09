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
 vm.appTypes;

 $rootScope.subAppName = "ALL";

 vm.explorersSrv = new ExplorersSrv();
 vm.constantsSrv = new ConstantsSrv();

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

 $rootScope.openAddExplorerModal = function () {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-explorer-modal.html',
   controller: 'AddExplorerCtrl as addExplorerCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    appTypes: function () {
     return vm.appTypes;
    }
   }
  });

  modalInstance.result.then(function (explorer) {
   vm.explorersSrv.createExplorer(explorer).then(function (data) {
    vm.explorers.unshift(data);
   });
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.openCreateRequestExplorerModal = function (explorerId) {
  var modalInstance = $uibModal.open({
   animation: true,
   templateUrl: 'add-request-explorer-modal.html',
   controller: 'CreateRequestExplorerCtrl as createRequestExplorerCtrl',
   backdrop: 'static',
   size: 'xl',
   resolve: {
    requestOptions: function () {
     return vm.explorersSrv.getExplorerRequestOptions(explorerId);
    }
   }
  });

  modalInstance.result.then(function (explorer) {
   vm.explorersSrv.createExplorer(explorer);
  }, function () {
   $log.info('Modal dismissed at: ' + new Date());
  });
 };

 vm.constantsSrv.getAppTypes().then(function (data) {
  vm.appTypes = data;
 });

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
