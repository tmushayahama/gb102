var journalsAppCtrl = function (
        ConstantsManager,
        JournalsManager,
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

 vm.journalsManager = new JournalsManager();

 if (isSearch) {
  vm.searchManager = new SearchManager();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchManager.simpleSearch(searchData).then(function (data) {
   vm.journals = data;
  });
 } else {
  vm.journalsManager.getAppJournals(vm.appName).then(function (data) {
   vm.journals = data;
  });
 }
};

journalsAppCtrl.$inject = [
 'ConstantsManager',
 'JournalsManager',
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

angular.module("app.journal").controller('JournalsAppCtrl', journalsAppCtrl);
