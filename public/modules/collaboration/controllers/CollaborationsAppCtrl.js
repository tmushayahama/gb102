var collaborationsAppCtrl = function (
        ConstantsSrv,
        CollaborationsSrv,
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

 vm.collaborationsSrv = new CollaborationsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.collaborations = data;
  });
 } else {
  vm.collaborationsSrv.getAppCollaborations(vm.appName).then(function (data) {
   vm.collaborations = data;
  });
 }
};

collaborationsAppCtrl.$inject = [
 'ConstantsSrv',
 'CollaborationsSrv',
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

angular.module("app.collaboration").controller('CollaborationsAppCtrl', collaborationsAppCtrl);
