var collaborationsAllCtrl = function (
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
 vm.collaborations = [];

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
  vm.collaborationsSrv.getAllCollaborations().then(function (data) {
   vm.collaborations = data;
  });
 }


};

collaborationsAllCtrl.$inject = [
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

angular.module("app.collaboration").controller('CollaborationsAllCtrl', collaborationsAllCtrl);
