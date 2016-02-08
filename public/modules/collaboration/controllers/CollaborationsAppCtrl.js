var collaborationsAppCtrl = function (
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

 vm.appName = $stateParams.app_name;

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
  vm.collaborationsManager.getAppCollaborations(vm.appName).then(function (data) {
   vm.collaborations = data;
  });
 }
};

collaborationsAppCtrl.$inject = [
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

angular.module("app.collaboration").controller('CollaborationsAppCtrl', collaborationsAppCtrl);