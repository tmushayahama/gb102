var journalsAllCtrl = function (
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
 vm.journals = [];

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
  vm.journalsManager.getAllJournals().then(function (data) {
   vm.journals = data;
  });
 }


};

journalsAllCtrl.$inject = [
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

angular.module("app.journal").controller('JournalsAllCtrl', journalsAllCtrl);