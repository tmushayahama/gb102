var journalsAllCtrl = function (
        ConstantsSrv,
        JournalsSrv,
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
 vm.journals = [];

 vm.journalsSrv = new JournalsSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.journals = data;
  });
 } else {
  vm.journalsSrv.getAllJournals().then(function (data) {
   vm.journals = data;
  });
 }


};

journalsAllCtrl.$inject = [
 'ConstantsSrv',
 'JournalsSrv',
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

angular.module("app.journal").controller('JournalsAllCtrl', journalsAllCtrl);
