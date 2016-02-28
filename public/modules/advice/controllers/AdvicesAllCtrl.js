var advicesAllCtrl = function (
        ConstantsSrv,
        AdvicesSrv,
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
 vm.advices = [];

 vm.advicesSrv = new AdvicesSrv();

 if (isSearch) {
  vm.searchSrv = new SearchSrv();
  var searchData = {
   query: $rootScope.searchKeyword
  };
  vm.searchSrv.simpleSearch(searchData).then(function (data) {
   vm.advices = data;
  });
 } else {
  vm.advicesSrv.getAllAdvices().then(function (data) {
   vm.advices = data;
  });
 }


};

advicesAllCtrl.$inject = [
 'ConstantsSrv',
 'AdvicesSrv',
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

angular.module("app.advice").controller('AdvicesAllCtrl', advicesAllCtrl);
