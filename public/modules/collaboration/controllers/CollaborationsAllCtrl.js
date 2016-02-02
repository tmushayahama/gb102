var collaborationsAllCtrl = function (
        ConstantsManager,
        CollaborationsManager,
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
 vm.collaborations = [];

 vm.collaborationsManager = new CollaborationsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.collaborations = data;
  });
 } else {
  vm.collaborationsManager.getAllCollaborations().then(function (data) {
   vm.collaborations = data;
  });
 }


};

collaborationsAllCtrl.$inject = [
 'ConstantsManager',
 'CollaborationsManager',
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

angular.module("app.collaboration").controller('CollaborationsAllCtrl', collaborationsAllCtrl);
